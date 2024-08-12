import { Controller, Delete, HttpCode, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { DeleteProductUseCase } from '@/domain/use-cases/products/delete-product.use-case';
import { CurrentUser } from '@/auth/current-user-decorator';
import { TokenPayload } from '@/auth/jwt-strategy';

@Controller('/products/:id')
@UseGuards(JwtAuthGuard)
export class DeleteProductController {
  constructor(private sut: DeleteProductUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(
    @Param('id') id: string,
    @CurrentUser() user: TokenPayload,
  ): Promise<void> {
    await this.sut.execute({
      productId: id,
      userId: user.sub,
    });
  }
}
