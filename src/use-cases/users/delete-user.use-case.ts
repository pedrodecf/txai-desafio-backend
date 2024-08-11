import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/user.repository';
import { ResourceNotFoundError } from '../errors/resource-not-found.error';

interface DeleteUserUseCaseRequest {
  userId: string;
}

Injectable();
export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ userId }: DeleteUserUseCaseRequest): Promise<void> {
    const userExists = await this.userRepository.findById(userId);

    if (!userExists) {
      throw new ResourceNotFoundError();
    }

    await this.userRepository.delete(userId);
  }
}
