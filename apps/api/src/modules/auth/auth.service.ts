import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { createLogger } from '@repo/logger';
import {
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
  hashToken,
  verifyPassword,
  verifyRefreshToken,
  type JwtPayload,
} from '@repo/tokens';
import { randomUUID } from 'node:crypto';
import type { CookieOptions, Response } from 'express';
import { env } from '../../common/env';
import { SessionService } from '../sessions/session.service';
import { CreateUserDto, LoginUserDto, UserResponseDTO } from './dto';
import { UserRepository } from './repository/user.repository';

const ACCESS_TOKEN_TTL_MS = 15 * 60 * 1000;
const REFRESH_TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;

@Injectable()
export class AuthService {
  private readonly logger = createLogger({ name: AuthService.name });

  constructor(
    private readonly userRepository: UserRepository,
    private readonly sessionService: SessionService,
  ) {}

  async register(
    dto: CreateUserDto,
    response: Response,
  ): Promise<UserResponseDTO> {
    const email = this.normalizeEmail(dto.email);
    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      this.logger.warn({ email }, 'Registration attempted for existing user');
      throw new ConflictException('User already exists');
    }

    const user = await this.userRepository.createUser({
      email,
      username: dto.username.trim(),
      passwordHash: await hashPassword(dto.password),
    });

    await this.createSessionAndSetCookies(user.id, response);
    this.logger.info({ userId: user.id }, 'User registered');

    return this.toResponse(user);
  }

  async login(dto: LoginUserDto, response: Response): Promise<UserResponseDTO> {
    const email = this.normalizeEmail(dto.email);
    const user = await this.userRepository.findByEmail(email);

    if (!user || !(await verifyPassword(dto.password, user.passwordHash))) {
      this.logger.warn({ email }, 'Login failed');
      throw new UnauthorizedException('Invalid credentials');
    }

    await this.createSessionAndSetCookies(user.id, response);
    this.logger.info({ userId: user.id }, 'User logged in');

    return this.toResponse(user);
  }

  async me(userId: string): Promise<UserResponseDTO> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.toResponse(user);
  }

  async refresh(
    refreshToken: string,
    response: Response,
  ): Promise<UserResponseDTO> {
    const payload = await this.verifyRefreshToken(refreshToken);
    const session = await this.sessionService.getSessionWithHash(payload.sub);

    if (!session) {
      throw new UnauthorizedException('No active session found');
    }

    const tokenMatches =
      session.id === payload.jti &&
      session.refreshTokenHash === hashToken(refreshToken);
    const sessionExpired = session.expiresAt.getTime() <= Date.now();

    if (!tokenMatches || sessionExpired) {
      await this.sessionService.clearSession(payload.sub);
      this.clearAuthCookies(response);
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const user = await this.userRepository.findById(payload.sub);
    if (!user) {
      await this.sessionService.clearSession(payload.sub);
      this.clearAuthCookies(response);
      throw new UnauthorizedException('User not found');
    }

    await this.setTokensForSession(user.id, session.id, response);
    this.logger.info({ userId: user.id }, 'User session refreshed');

    return this.toResponse(user);
  }

  async logout(
    refreshToken: string | undefined,
    response: Response,
  ): Promise<void> {
    if (refreshToken) {
      try {
        const payload = await verifyRefreshToken(
          refreshToken,
          env.refreshTokenSecret,
        );
        await this.sessionService.clearSession(payload.sub);
      } catch {
        this.logger.debug('Logout received an invalid refresh token');
      }
    }

    this.clearAuthCookies(response);
  }

  private async createSessionAndSetCookies(
    userId: string,
    response: Response,
  ): Promise<void> {
    const expiresAt = new Date(Date.now() + REFRESH_TOKEN_TTL_MS);
    const session = await this.sessionService.createSession({
      userId,
      refreshTokenHash: hashToken(randomUUID()),
      expiresAt,
    });

    await this.setTokensForSession(userId, session.id, response);
  }

  private async setTokensForSession(
    userId: string,
    sessionId: string,
    response: Response,
  ): Promise<void> {
    const payload: JwtPayload = {
      sub: userId,
      jti: sessionId,
    };
    const [accessToken, refreshToken] = await Promise.all([
      generateAccessToken(payload, env.accessTokenSecret),
      generateRefreshToken(payload, env.refreshTokenSecret),
    ]);

    await this.sessionService.createSession({
      userId,
      refreshTokenHash: hashToken(refreshToken),
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL_MS),
    });

    response.cookie('access_token', accessToken, {
      ...this.cookieOptions,
      maxAge: ACCESS_TOKEN_TTL_MS,
    });
    response.cookie('refresh_token', refreshToken, {
      ...this.cookieOptions,
      maxAge: REFRESH_TOKEN_TTL_MS,
    });
  }

  private async verifyRefreshToken(refreshToken: string): Promise<JwtPayload> {
    try {
      return await verifyRefreshToken(refreshToken, env.refreshTokenSecret);
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  private clearAuthCookies(response: Response): void {
    response.clearCookie('access_token', this.cookieOptions);
    response.clearCookie('refresh_token', this.cookieOptions);
  }

  private normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }

  private toResponse(user: {
    id: string;
    username: string;
    email: string;
    createdAt: Date;
  }): UserResponseDTO {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    };
  }

  private get cookieOptions(): CookieOptions {
    return {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    };
  }
}
