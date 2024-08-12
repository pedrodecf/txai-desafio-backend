import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../repositories/product.repository';
import { ResourceNotFoundError } from '../errors/resource-not-found.error';

interface DeleteProductUseCaseRequest {
  productId: string;
}

@Injectable()
export class DeleteProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({ productId }: DeleteProductUseCaseRequest): Promise<void> {
    const productExists = await this.productRepository.findById(productId);

    if (!productExists) {
      throw new ResourceNotFoundError();
    }

    await this.productRepository.delete(productId);
  }
}
