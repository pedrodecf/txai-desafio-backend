import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { CurrentUser } from '@/auth/current-user-decorator';
import { TokenPayload } from '@/auth/jwt-strategy';
import {
  FetchProductsUseCase,
  FetchProductsUseCaseResponse,
} from '@/domain/use-cases/products/fetch-products.use-case';

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1));

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema);
type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>;

@Controller('/products')
@UseGuards(JwtAuthGuard)
export class FetchProductsController {
  constructor(private sut: FetchProductsUseCase) {}

  @Get()
  async handle(
    @CurrentUser() user: TokenPayload,
    @Query('page', queryValidationPipe) page: PageQueryParamSchema,
  ): Promise<FetchProductsUseCaseResponse> {
    const result = await this.sut.execute({
      page,
      userId: user.sub,
    });

    return result;
  }
}
