import { Injectable } from '@nestjs/common';
import prisma from '@repo/db';

@Injectable()
export class SessionRepository {
  async upsertSession(data: {
    userId: string;
    refreshTokenHash: string;
    expiresAt: Date;
  }) {
    const session = await prisma.sessions.upsert({
      where: { user_id: data.userId },
      update: {
        refreshTokenHash: data.refreshTokenHash,
        lastLogin: new Date(),
        expiresAt: data.expiresAt,
      },
      create: {
        user_id: data.userId,
        refreshTokenHash: data.refreshTokenHash,
        lastLogin: new Date(),
        expiresAt: data.expiresAt,
      },
    });

    return this.toSession(session);
  }

  async findByUserId(userId: string) {
    const session = await prisma.sessions.findUnique({
      where: { user_id: userId },
    });

    return session ? this.toSession(session) : null;
  }

  async deleteByUserId(userId: string): Promise<void> {
    await prisma.sessions.deleteMany({
      where: { user_id: userId },
    });
  }

  private toSession(session: {
    id: string;
    user_id: string;
    refreshTokenHash: string;
    lastLogin: Date;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
  }) {
    return {
      id: session.id,
      userId: session.user_id,
      refreshTokenHash: session.refreshTokenHash,
      lastLogin: session.lastLogin,
      expiresAt: session.expiresAt,
      createdAt: session.createdAt,
      updatedAt: session.updatedAt,
    };
  }
}
