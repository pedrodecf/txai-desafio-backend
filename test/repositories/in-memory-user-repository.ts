import { UserRepository } from '@/domain/repositories/user.repository';
import { PaginationParams } from '@/utils/paginations-params';
import { User } from '@prisma/client';
import { randomUUID } from 'node:crypto';

export class InMemoryUserRepository implements UserRepository {
  public items: User[] = [];

  async create(user: User) {
    const newUser: User = {
      id: user.id || randomUUID(),
      name: user.name,
      username: user.username,
      password: user.password,
      email: user.email,
      createdAt: user.createdAt || new Date(),
      updatedAt: user.updatedAt || null,
      role: user.role || 'USER',
    };

    this.items.push(newUser);
  }

  async delete(userId: string): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === userId);
    if (itemIndex === -1) {
      return null;
    }
    this.items.splice(itemIndex, 1);
  }

  async findAll({ page }: PaginationParams): Promise<User[]> {
    return this.items.slice((page - 1) * 20, page * 20);
  }

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id === id);
    if (!user) {
      return null;
    }
    return user;
  }

  async update(userId: string, userData: Partial<User>): Promise<User | null> {
    const userIndex = this.items.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      return null;
    }

    const existingUser = this.items[userIndex];
    const updatedUser: User = {
      ...existingUser,
      ...userData,
      updatedAt: new Date(),
    };

    this.items[userIndex] = updatedUser;

    return updatedUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email);
    if (!user) {
      return null;
    }
    return user;
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = this.items.find((item) => item.username === username);
    if (!user) {
      return null;
    }
    return user;
  }
}
