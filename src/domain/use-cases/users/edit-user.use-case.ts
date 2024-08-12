import { User, UserRole } from '@prisma/client';
import { UserRepository } from '../../repositories/user.repository';
import { Injectable, NotFoundException } from '@nestjs/common';

interface EditUserUseCaseRequest {
  userId: string;
  name?: string;
  role?: UserRole;
  username?: string;
  email?: string;
  password?: string;
}

interface EditUserUseCaseResponse {
  user: User | null;
}

@Injectable()
export class EditUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    userId,
    name,
    role,
    username,
    email,
    password,
  }: EditUserUseCaseRequest): Promise<EditUserUseCaseResponse> {
    const existingUser = await this.userRepository.findById(userId);

    if (!existingUser) {
      throw new NotFoundException('Resource not found');
    }

    const updatedUser = await this.userRepository.update(userId, {
      name: name ?? existingUser.name,
      role: role ?? existingUser.role,
      username: username ?? existingUser.username,
      email: email ?? existingUser.email,
      password: password ?? existingUser.password,
    });

    return { user: updatedUser };
  }
}
