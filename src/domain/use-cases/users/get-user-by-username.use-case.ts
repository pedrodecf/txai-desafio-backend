import { User } from '@prisma/client';
import { UserRepository } from '../../repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { ResourceNotFoundError } from '../errors/resource-not-found.error';

interface GetUserByUsernameUseCaseRequest {
  username: string;
}

interface GetUserByUsernameUseCaseResponse {
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
      throw new ResourceNotFoundError();
    }

    return { user };
  }
}
