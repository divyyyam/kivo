import { Injectable } from '@nestjs/common';
import { createLogger } from '@repo/logger';
import { SessionResponseDTO } from './dto';
import { SessionRepository } from './repository/session.repository';

@Injectable()
export class SessionService {
  private readonly logger = createLogger({ name: SessionService.name });

  constructor(private readonly sessionRepository: SessionRepository) {}

  async createSession(data: {
    userId: string;
    refreshTokenHash: string;
    expiresAt: Date;
  }): Promise<SessionResponseDTO> {
    this.logger.info({ userId: data.userId }, 'Creating user session');

    const session = await this.sessionRepository.upsertSession({
      userId: data.userId,
      refreshTokenHash: data.refreshTokenHash,
      expiresAt: data.expiresAt,
    });

    return this.toResponse(session);
  }

  async findSession(userId: string): Promise<SessionResponseDTO | null> {
    const session = await this.sessionRepository.findByUserId(userId);
    return session ? this.toResponse(session) : null;
  }

  async getSessionWithHash(userId: string) {
    return this.sessionRepository.findByUserId(userId);
  }

  async clearSession(userId: string): Promise<void> {
    this.logger.info({ userId }, 'Clearing user session');
    await this.sessionRepository.deleteByUserId(userId);
  }

  private toResponse(session: {
    id: string;
    userId: string;
    lastLogin: Date;
    expiresAt: Date;
    createdAt: Date;
  }): SessionResponseDTO {
    return {
      id: session.id,
      userId: session.userId,
      lastLogin: session.lastLogin,
      expiresAt: session.expiresAt,
      createdAt: session.createdAt,
    };
  }
}
