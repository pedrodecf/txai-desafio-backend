import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../../repositories/product.repository';

interface DeleteProductUseCaseRequest {
  productId: string;
}

@Injectable()
export class DeleteProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({ productId }: DeleteProductUseCaseRequest): Promise<void> {
    const productExists = await this.productRepository.findById(productId);

    if (!productExists) {
      throw new NotFoundException('Resource not found');
    }

    await this.productRepository.delete(productId);
  }
}
