import { Product } from '@prisma/client';
import { ProductRepository } from '../../repositories/product.repository';
import { Injectable } from '@nestjs/common';
import { ResourceNotFoundError } from '../errors/resource-not-found.error';
import { UnauthorizedError } from '../errors/unauthorized.error';

interface EditProductUseCaseRequest {
  id: string;
  userId: string;
  name?: string;
  value?: number;
  quantity?: number;
}

interface EditProductUseCaseResponse {
  product: Product | null;
}

Injectable();
export class EditProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    id,
    userId,
    name,
    quantity,
    value,
  }: EditProductUseCaseRequest): Promise<EditProductUseCaseResponse> {
    const existingProduct = await this.productRepository.findById(id);

    if (!existingProduct) {
      throw new ResourceNotFoundError();
    }

    if (existingProduct.userId !== userId) {
      throw new UnauthorizedError();
    }

    const updatedProduct = await this.productRepository.update(id, {
      name: name ?? existingProduct.name,
      quantity: quantity ?? existingProduct.quantity,
      value: value ?? existingProduct.value,
    });

    return { product: updatedProduct };
  }
}
