import { User } from '@prisma/client';
import { UserRepository } from '../../repositories/user.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { excludePassword } from '@/utils/exclued-password';

interface GetUserByEmailUseCaseRequest {
  email: string;
}

interface GetUserByEmailUseCaseResponse {
  user: Omit<User, 'password'>;
}

@Injectable()
export class GetUserByEmailUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
  }: GetUserByEmailUseCaseRequest): Promise<GetUserByEmailUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return { user: excludePassword(user) };
  }
}
