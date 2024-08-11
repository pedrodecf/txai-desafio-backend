import { Product } from '@prisma/client';
import { ProductRepository } from '../../repositories/product.repository';
import { Injectable } from '@nestjs/common';

interface CreateProductUseCaseRequest {
  userId: string;
  name: string;
  value: number;
  quantity: number;
}

interface CreateProductUseCaseResponse {
  product: Product;
}

Injectable();
export class CreateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    userId,
    name,
    quantity,
    value,
  }: CreateProductUseCaseRequest): Promise<CreateProductUseCaseResponse> {
    const product = await this.productRepository.create({
      name,
      quantity,
      value,
      userId,
    });

    return { product };
  }
}
