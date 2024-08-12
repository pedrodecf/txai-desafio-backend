import { User } from '@prisma/client';
import { UserRepository } from '../../repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { ResourceNotFoundError } from '../errors/resource-not-found.error';

interface GetUserByIDUseCaseRequest {
  userId: string;
}

interface GetUserByIDUseCaseResponse {
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
      throw new ResourceNotFoundError();
    }

    return { user };
  }
}
