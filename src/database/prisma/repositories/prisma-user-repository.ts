import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';
import { PaginationParams } from '@/utils/paginations-params';
import { UserRepository } from '@/domain/repositories/user.repository';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: User): Promise<User> {
    const user = await this.prisma.user.create({
      data,
    });

    return user;
  }

  async update(userId: string, userData: Partial<User>): Promise<User> {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: userData,
    });

    return user;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async findAll({ page }: PaginationParams): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return users;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });

    return user;
  }
}
