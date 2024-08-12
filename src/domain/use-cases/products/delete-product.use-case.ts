import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ProductRepository } from '../../repositories/product.repository';

interface DeleteProductUseCaseRequest {
  userId: string;
  productId: string;
}

@Injectable()
export class DeleteProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    productId,
    userId,
  }: DeleteProductUseCaseRequest): Promise<void> {
    const productExists = await this.productRepository.findById(productId);

    if (!productExists) {
      throw new NotFoundException('Resource not found');
    }

    if (productExists.userId !== userId) {
      throw new UnauthorizedException('Unauthorized access');
    }

    await this.productRepository.delete(productId);
  }
}
