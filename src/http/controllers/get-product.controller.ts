import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { CurrentUser } from '@/auth/current-user-decorator';
import { TokenPayload } from '@/auth/jwt-strategy';
import {
  GetProductByIDUseCase,
  GetProductByIDUseCaseResponse,
} from '@/domain/use-cases/products/get-product-by-id.use-case';

@Controller('/products/:id')
@UseGuards(JwtAuthGuard)
export class GetProductController {
  constructor(private sut: GetProductByIDUseCase) {}

  @Get()
  async handle(
    @CurrentUser() user: TokenPayload,
    @Param('id') id: string,
  ): Promise<GetProductByIDUseCaseResponse> {
    const result = await this.sut.execute({
      productId: id,
      userId: user.sub,
    });

    return result;
  }
}
