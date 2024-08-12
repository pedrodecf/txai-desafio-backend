import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { CurrentUser } from '@/auth/current-user-decorator';
import { TokenPayload } from '@/auth/jwt-strategy';
import {
  GetUserByIDUseCase,
  GetUserByIDUseCaseResponse,
} from '@/domain/use-cases/users/get-user-by-id.use-case';
import { RolesGuard } from '@/auth/roles.guard';
import { Roles } from '@/auth/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('/user/:userId')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GetUserByIdController {
  constructor(private sut: GetUserByIDUseCase) {}

  @Get()
  @Roles(UserRole.ADMIN)
  async handle(
    @CurrentUser() user: TokenPayload,
    @Param('userId') userId: string,
  ): Promise<GetUserByIDUseCaseResponse> {
    const result = await this.sut.execute({
      userId,
    });

    return result;
  }
}
