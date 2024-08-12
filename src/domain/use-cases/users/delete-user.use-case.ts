import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../../repositories/user.repository';

interface DeleteUserUseCaseRequest {
  userId: string;
  userIdParam: string;
}

@Injectable()
export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    userId,
    userIdParam,
  }: DeleteUserUseCaseRequest): Promise<void> {
    const userExists = await this.userRepository.findById(userIdParam);

    if (!userExists) {
      throw new NotFoundException('Resource not found');
    }

    if (userId !== userIdParam) {
      throw new UnauthorizedException('Unauthorized access');
    }

    await this.userRepository.delete(userId);
  }
}
