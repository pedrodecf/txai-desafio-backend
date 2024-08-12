import { UserRepository } from '../../repositories/user.repository';
import { hash } from 'bcryptjs';
import { ConflictException, Injectable } from '@nestjs/common';

interface CreateUserUseCaseRequest {
  name: string;
  username: string;
  password: string;
  email: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ name, username, password, email }: CreateUserUseCaseRequest) {
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

    await this.userRepository.create({
      name,
      username,
      password: hashedPassword,
      email,
    });
  }
}
