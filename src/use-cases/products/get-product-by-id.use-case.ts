import { Product } from '@prisma/client';
import { ProductRepository } from '../../repositories/product.repository';
import { Injectable } from '@nestjs/common';
import { UnauthorizedError } from '../errors/unauthorized.error';
import { ResourceNotFoundError } from '../errors/resource-not-found.error';

interface GetProductByIDUseCaseRequest {
  productId: string;
  userId: string;
}

interface GetProductByIDUseCaseResponse {
  product: Product;
}

Injectable();
export class GetProductByIDUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    productId,
    userId,
  }: GetProductByIDUseCaseRequest): Promise<GetProductByIDUseCaseResponse> {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new ResourceNotFoundError();
    }

    if (product.userId.toString() !== userId) {
      throw new UnauthorizedError();
    }

    return { product };
  }
}
