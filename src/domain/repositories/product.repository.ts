import { PaginationParams } from '@/utils/paginations-params';
import { Prisma, Product } from '@prisma/client';

export abstract class ProductRepository {
  abstract create(
    product: Prisma.ProductUncheckedCreateInput,
  ): Promise<Product>;

  abstract update(
    id: string,
    productData: Partial<Product>,
  ): Promise<Product | null>;

  abstract delete(id: string): Promise<void>;

  abstract findAll(
    userId: string,
    params: PaginationParams,
  ): Promise<Product[]>;

  abstract findById(id: string): Promise<Product | null>;
}
