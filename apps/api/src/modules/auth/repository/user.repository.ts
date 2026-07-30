import { Injectable } from '@nestjs/common';
import prisma from '@repo/db';

@Injectable()
export class UserRepository {
  async findByEmail(email: string) {
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    return user ? this.toUser(user) : null;
  }

  async createUser(data: {
    email: string;
    username: string;
    passwordHash: string;
  }) {
    const user = await prisma.users.create({
      data: {
        email: data.email,
        user_name: data.username,
        password_hash: data.passwordHash,
      },
    });

    return this.toUser(user);
  }

  async findById(userId: string) {
    const user = await prisma.users.findUnique({
      where: {
        id: userId,
      },
    });

    return user ? this.toUser(user) : null;
  }

  async findByUsername(username: string) {
    const user = await prisma.users.findFirst({
      where: {
        user_name: username,
      },
    });

    return user ? this.toUser(user) : null;
  }

  private toUser(user: {
    id: string;
    email: string;
    user_name: string;
    password_hash: string;
    created_at: Date;
    updated_at: Date;
  }) {
    return {
      id: user.id,
      email: user.email,
      username: user.user_name,
      passwordHash: user.password_hash,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    };
  }
}
