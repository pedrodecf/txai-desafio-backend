import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { CurrentUser } from '@/auth/current-user-decorator';
import { TokenPayload } from '@/auth/jwt-strategy';
import {
  GetUserByIDUseCase,
  GetUserByIDUseCaseResponse,
} from '@/domain/use-cases/users/get-user-by-id.use-case';

@Controller('/user')
@UseGuards(JwtAuthGuard)
export class GetUserByIdController {
  constructor(private sut: GetUserByIDUseCase) {}

  @Get()
  async handle(
    @CurrentUser() user: TokenPayload,
  ): Promise<GetUserByIDUseCaseResponse> {
    const result = await this.sut.execute({
      userId: user.sub,
    });

    return result;
  }
}
