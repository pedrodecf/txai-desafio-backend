import { User } from '@prisma/client';
import { UserRepository } from '../../repositories/user.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { excludePassword } from '@/utils/exclued-password';

interface GetUserByUsernameUseCaseRequest {
  username: string;
}

export interface GetUserByUsernameUseCaseResponse {
  user: Omit<User, 'password'>;
}

@Injectable()
export class GetUserByUsernameUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    username,
  }: GetUserByUsernameUseCaseRequest): Promise<GetUserByUsernameUseCaseResponse> {
    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return { user: excludePassword(user) };
  }
}
