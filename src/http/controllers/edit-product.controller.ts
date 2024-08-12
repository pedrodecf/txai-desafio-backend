import {
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { z } from 'zod';
import { EditProductUseCase } from '@/domain/use-cases/products/edit-product.use-case';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { CurrentUser } from '@/auth/current-user-decorator';
import { TokenPayload } from '@/auth/jwt-strategy';

const editProductBodySchema = z.object({
  name: z.string().min(2).max(255),
  quantity: z.number().int().positive(),
  value: z.number().positive().multipleOf(0.01),
});

const bodyValidationPipe = new ZodValidationPipe(editProductBodySchema);
type EditProductBodySchema = z.infer<typeof editProductBodySchema>;

@Controller('/products/:id')
@UseGuards(JwtAuthGuard)
export class EditProductController {
  constructor(private editProduct: EditProductUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditProductBodySchema,
    @Param('id') id: string,
    @CurrentUser() user: TokenPayload,
  ) {
    const { name, quantity, value } = body;

    await this.editProduct.execute({
      id,
      name,
      quantity,
      value,
      userId: user.sub,
    });
  }
}
