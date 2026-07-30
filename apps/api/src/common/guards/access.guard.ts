import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { verifyAccessToken } from '@repo/tokens';
import { env } from '../env';
import { getCookie } from '../http/cookies';
import type { AuthenticatedRequest } from '../types/authenticated-request';

@Injectable()
export class UserAccessGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = getCookie(request, 'access_token');

    if (!token) {
      throw new UnauthorizedException('Access token not found');
    }

    try {
      request.user = await verifyAccessToken(token, env.accessTokenSecret);
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired access token');
    }
  }
}
