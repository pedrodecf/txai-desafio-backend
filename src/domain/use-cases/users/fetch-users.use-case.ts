import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserRepository } from '../../repositories/user.repository';
import { excludePasswordFromUsers } from '@/utils/exclued-password';

interface FetchUsersUseCaseRequest {
  page: number;
}

export interface FetchUsersUseCaseResponse {
  users: Omit<User, 'password'>[];
}

@Injectable()
export class FetchUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    page,
  }: FetchUsersUseCaseRequest): Promise<FetchUsersUseCaseResponse> {
    const users = await this.userRepository.findAll({ page });

    return { users: excludePasswordFromUsers(users) };
  }
}
