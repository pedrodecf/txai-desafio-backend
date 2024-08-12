import { Controller, Delete, HttpCode, Param, UseGuards } from '@nestjs/common';
import { DeleteUserUseCase } from '@/domain/use-cases/users/delete-user.use-case';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { TokenPayload } from '@/auth/jwt-strategy';
import { CurrentUser } from '@/auth/current-user-decorator';
import { Roles } from '@/auth/roles.decorator';
import { UserRole } from '@prisma/client';
import { RolesGuard } from '@/auth/roles.guard';

@Controller('/users/:userIdParam')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DeleteUserController {
  constructor(private sut: DeleteUserUseCase) {}

  @Delete()
  @HttpCode(204)
  @Roles(UserRole.ADMIN)
  async handle(
    @Param('userIdParam') userIdParam: string,
    @CurrentUser() user: TokenPayload,
  ) {
    await this.sut.execute({
      userId: user.sub,
      userIdParam,
    });
  }
}
