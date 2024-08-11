import { PaginationParams } from '@/utils/paginations-params';
import { Prisma, User } from '@prisma/client';

export abstract class UserRepository {
  abstract create(user: Prisma.UserUncheckedCreateInput): Promise<void>;

  abstract update(
    userId: string,
    userData: Partial<User>,
  ): Promise<User | null>;

  abstract delete(id: string): Promise<void>;

  abstract findAll(params: PaginationParams): Promise<User[]>;

  abstract findById(id: string): Promise<User | null>;

  abstract findByEmail(email: string): Promise<User | null>;

  abstract findByUsername(username: string): Promise<User | null>;
}
