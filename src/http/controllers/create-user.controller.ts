import { Body, Controller, Post } from '@nestjs/common';
import { z } from 'zod';
import { CreateUserUseCase } from '@/domain/use-cases/users/create-user.use-case';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';

const createUserBodySchema = z.object({
  name: z.string().min(2).max(255),
  username: z.string().min(3).max(30),
  password: z.string().min(6),
  email: z.string().email(),
});

const bodyValidationPipe = new ZodValidationPipe(createUserBodySchema);
type CreateUserBodySchema = z.infer<typeof createUserBodySchema>;

@Controller('/users')
export class CreateUserController {
  constructor(private createUser: CreateUserUseCase) {}

  @Post()
  async handle(@Body(bodyValidationPipe) body: CreateUserBodySchema) {
    const { name, username, password, email } = body;

    await this.createUser.execute({
      email,
      name,
      password,
      username,
    });
  }
}
