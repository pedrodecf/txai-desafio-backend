import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../repositories/user.repository';

interface DeleteUserUseCaseRequest {
  userId: string;
}

@Injectable()
export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ userId }: DeleteUserUseCaseRequest): Promise<void> {
    const userExists = await this.userRepository.findById(userId);

    if (!userExists) {
      throw new NotFoundException('Resource not found');
    }

    await this.userRepository.delete(userId);
  }
}
