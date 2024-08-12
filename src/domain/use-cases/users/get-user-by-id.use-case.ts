import { User } from '@prisma/client';
import { UserRepository } from '../../repositories/user.repository';
import { Injectable, NotFoundException } from '@nestjs/common';

interface GetUserByIDUseCaseRequest {
  userId: string;
}

export interface GetUserByIDUseCaseResponse {
  user: User;
}

@Injectable()
export class GetUserByIDUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    userId,
  }: GetUserByIDUseCaseRequest): Promise<GetUserByIDUseCaseResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('Resource not found');
    }

    return { user };
  }
}
