import type { JwtPayload } from '@repo/tokens';
import type { Request } from 'express';

export type AuthenticatedRequest = Request & {
  user: JwtPayload;
};
