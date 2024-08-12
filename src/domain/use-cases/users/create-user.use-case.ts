import { UserRepository } from '../../repositories/user.repository';
import { hash } from 'bcryptjs';
import { ConflictException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { excludePassword } from '@/utils/exclued-password';

interface CreateUserUseCaseRequest {
  name: string;
  username: string;
  password: string;
  email: string;
}

export interface CreateUserUseCaseResponse {
  user: Omit<User, 'password'>;
}

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    name,
    username,
    password,
    email,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const [emailAlreadyInUse, usernameAlreadyExists] = await Promise.all([
      this.userRepository.findByEmail(email),
      this.userRepository.findByUsername(username),
    ]);

    if (emailAlreadyInUse) {
      throw new ConflictException('This email is already in use');
    }

    if (usernameAlreadyExists) {
      throw new ConflictException('This username is already in use');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.userRepository.create({
      name,
      username,
      password: hashedPassword,
      email,
    });

    return { user: excludePassword(user) };
  }
}
