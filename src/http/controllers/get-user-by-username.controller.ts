import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { CurrentUser } from '@/auth/current-user-decorator';
import { TokenPayload } from '@/auth/jwt-strategy';
import {
  GetUserByUsernameUseCase,
  GetUserByUsernameUseCaseResponse,
} from '@/domain/use-cases/users/get-user-by-username.use-case';

@Controller('/users/:username')
@UseGuards(JwtAuthGuard)
export class GetUserByUsernameController {
  constructor(private sut: GetUserByUsernameUseCase) {}

  @Get()
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
