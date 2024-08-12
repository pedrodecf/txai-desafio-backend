import { Product } from '@prisma/client';
import { ProductRepository } from '../../repositories/product.repository';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

interface GetProductByIDUseCaseRequest {
  productId: string;
  userId: string;
}

interface GetProductByIDUseCaseResponse {
  product: Product;
}

@Injectable()
export class GetProductByIDUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    productId,
    userId,
  }: GetProductByIDUseCaseRequest): Promise<GetProductByIDUseCaseResponse> {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new NotFoundException('Resource not found');
    }

    if (product.userId.toString() !== userId) {
      throw new UnauthorizedException('Unauthorized access');
    }

    return { product };
  }
}
