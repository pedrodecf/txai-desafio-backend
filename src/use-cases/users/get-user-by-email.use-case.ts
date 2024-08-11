import { User } from '@prisma/client';
import { UserRepository } from '../../repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { ResourceNotFoundError } from '../errors/resource-not-found.error';

interface GetUserByEmailUseCaseRequest {
  email: string;
}

interface GetUserByEmailUseCaseResponse {
  user: User;
}

Injectable();
export class GetUserByEmailUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
  }: GetUserByEmailUseCaseRequest): Promise<GetUserByEmailUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return { user };
  }
}
