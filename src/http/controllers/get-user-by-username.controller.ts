import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { CurrentUser } from '@/auth/current-user-decorator';
import { TokenPayload } from '@/auth/jwt-strategy';
import {
  GetUserByUsernameUseCase,
  GetUserByUsernameUseCaseResponse,
} from '@/domain/use-cases/users/get-user-by-username.use-case';
import { RolesGuard } from '@/auth/roles.guard';
import { Roles } from '@/auth/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('/users/:username')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GetUserByUsernameController {
  constructor(private sut: GetUserByUsernameUseCase) {}

  @Get()
  @Roles(UserRole.ADMIN)
  async handle(
    @CurrentUser() user: TokenPayload,
    @Param('username') username: string,
  ): Promise<GetUserByUsernameUseCaseResponse> {
    const result = await this.sut.execute({
      username,
    });

    return result;
  }
}
