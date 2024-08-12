import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { ProductRepository } from '../../repositories/product.repository';

interface FetchProductsUseCaseRequest {
  userId: string;
  page: number;
}

export interface FetchProductsUseCaseResponse {
  products: Product[];
}

@Injectable()
export class FetchProductsUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    userId,
    page,
  }: FetchProductsUseCaseRequest): Promise<FetchProductsUseCaseResponse> {
    const products = await this.productRepository.findAll(userId, { page });

    return { products };
  }
}
