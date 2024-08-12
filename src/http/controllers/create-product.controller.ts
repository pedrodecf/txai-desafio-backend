import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { z } from 'zod';
import {
  CreateProductUseCase,
  CreateProductUseCaseResponse,
} from '@/domain/use-cases/products/create-product.use-case';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { CurrentUser } from '@/auth/current-user-decorator';
import { TokenPayload } from '@/auth/jwt-strategy';

const createProductBodySchema = z.object({
  name: z.string().min(2).max(255),
  quantity: z.number().int().positive(),
  value: z.number().positive().multipleOf(0.01),
});

const bodyValidationPipe = new ZodValidationPipe(createProductBodySchema);
type CreateProductBodySchema = z.infer<typeof createProductBodySchema>;

@Controller('/products')
@UseGuards(JwtAuthGuard)
export class CreateProductController {
  constructor(private createProduct: CreateProductUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateProductBodySchema,
    @CurrentUser() user: TokenPayload,
  ): Promise<CreateProductUseCaseResponse> {
    const { name, quantity, value } = body;

    const product = await this.createProduct.execute({
      name,
      quantity,
      value,
      userId: user.sub,
    });

    return product;
  }
}
