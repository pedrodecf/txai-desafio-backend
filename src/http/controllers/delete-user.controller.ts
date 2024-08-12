import { Controller, Delete, HttpCode, Param, UseGuards } from '@nestjs/common';
import { DeleteUserUseCase } from '@/domain/use-cases/users/delete-user.use-case';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { TokenPayload } from '@/auth/jwt-strategy';
import { CurrentUser } from '@/auth/current-user-decorator';

@Controller('/users/:userIdParam')
@UseGuards(JwtAuthGuard)
export class DeleteUserController {
  constructor(private sut: DeleteUserUseCase) {}

  @Delete()
  @HttpCode(204)
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
