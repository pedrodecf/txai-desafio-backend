import { User } from '@prisma/client';
import { UserRepository } from '../../repositories/user.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { excludePassword } from '@/utils/exclued-password';

interface GetUserByIDUseCaseRequest {
  userId: string;
}

export interface GetUserByIDUseCaseResponse {
  user: Omit<User, 'password'>;
}

@Injectable()
export class GetUserByIDUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    userId,
  }: GetUserByIDUseCaseRequest): Promise<GetUserByIDUseCaseResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return { user: excludePassword(user) };
  }
}
