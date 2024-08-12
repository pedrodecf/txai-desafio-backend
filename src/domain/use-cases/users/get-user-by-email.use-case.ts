import { User } from '@prisma/client';
import { UserRepository } from '../../repositories/user.repository';
import { Injectable, NotFoundException } from '@nestjs/common';

interface GetUserByEmailUseCaseRequest {
  email: string;
}

interface GetUserByEmailUseCaseResponse {
  user: User;
}

@Injectable()
export class GetUserByEmailUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
  }: GetUserByEmailUseCaseRequest): Promise<GetUserByEmailUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException('Resource not found');
    }

    return { user };
  }
}
