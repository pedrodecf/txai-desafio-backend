import { Product } from '@prisma/client';
import { ProductRepository } from '../../repositories/product.repository';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

interface EditProductUseCaseRequest {
  id: string;
  userId: string;
  name?: string;
  value?: number;
  quantity?: number;
}

export interface EditProductUseCaseResponse {
  product: Product | null;
}

@Injectable()
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
      throw new NotFoundException('Resource not found');
    }

    if (existingProduct.userId !== userId) {
      throw new UnauthorizedException('Unauthorized access');
    }

    const updatedProduct = await this.productRepository.update(id, {
      name: name ?? existingProduct.name,
      quantity: quantity ?? existingProduct.quantity,
      value: value ?? existingProduct.value,
    });

    return { product: updatedProduct };
  }
}
