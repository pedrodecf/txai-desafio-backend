import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserRepository } from '../../repositories/user.repository';

interface FetchUsersUseCaseRequest {
  page: number;
}

interface FetchUsersUseCaseResponse {
  users: User[];
}

@Injectable()
export class FetchUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    page,
  }: FetchUsersUseCaseRequest): Promise<FetchUsersUseCaseResponse> {
    const users = await this.userRepository.findAll({ page });

    return { users };
  }
}
