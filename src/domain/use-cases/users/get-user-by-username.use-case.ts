import { User } from '@prisma/client';
import { UserRepository } from '../../repositories/user.repository';
import { Injectable, NotFoundException } from '@nestjs/common';

interface GetUserByUsernameUseCaseRequest {
  username: string;
}

export interface GetUserByUsernameUseCaseResponse {
  user: User;
}

@Injectable()
export class GetUserByUsernameUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    username,
  }: GetUserByUsernameUseCaseRequest): Promise<GetUserByUsernameUseCaseResponse> {
    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      throw new NotFoundException('Resource not found');
    }

    return { user };
  }
}
