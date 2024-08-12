import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import {
  FetchUsersUseCase,
  FetchUsersUseCaseResponse,
} from '@/domain/use-cases/users/fetch-users.use-case';

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1));

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema);
type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>;

@Controller('/users')
@UseGuards(JwtAuthGuard)
export class FetchUsersController {
  constructor(private sut: FetchUsersUseCase) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParamSchema,
  ): Promise<FetchUsersUseCaseResponse> {
    const result = await this.sut.execute({
      page,
    });

    return result;
  }
}
