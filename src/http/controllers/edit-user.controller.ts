import {
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { z } from 'zod';
import { EditUserUseCase } from '@/domain/use-cases/users/edit-user.use-case';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { CurrentUser } from '@/auth/current-user-decorator';
import { TokenPayload } from '@/auth/jwt-strategy';
import { RolesGuard } from '@/auth/roles.guard';
import { Roles } from '@/auth/roles.decorator';
import { UserRole } from '@prisma/client';

const editUserBodySchema = z.object({
  name: z.string().min(2).max(255),
  username: z.string().min(3).max(30),
  password: z.string().min(6),
  email: z.string().email(),
});

const bodyValidationPipe = new ZodValidationPipe(editUserBodySchema);
type EditUserBodySchema = z.infer<typeof editUserBodySchema>;

@Controller('/users/:id')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EditUserController {
  constructor(private editUser: EditUserUseCase) {}

  @Put()
  @HttpCode(204)
  @Roles(UserRole.ADMIN)
  async handle(
    @Body(bodyValidationPipe) body: EditUserBodySchema,
    @Param('id') id: string,
    @CurrentUser() user: TokenPayload,
  ) {
    const { name, email, password, username } = body;

    const userEdited = await this.editUser.execute({
      userId: user.sub,
      name,
      email,
      password,
      username,
    });

    return userEdited;
  }
}
