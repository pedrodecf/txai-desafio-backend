import { ProductRepository } from '@/domain/repositories/product.repository';
import { PaginationParams } from '@/utils/paginations-params';
import { Product } from '@prisma/client';
import { randomUUID } from 'node:crypto';

export class InMemoryProductRepository implements ProductRepository {
  public items: Product[] = [];

  async create(product: Product): Promise<Product> {
    const newProduct: Product = {
      id: product.id || randomUUID(),
      name: product.name,
      value: product.value,
      quantity: product.quantity,
      createdAt: product.createdAt || new Date(),
      updatedAt: product.updatedAt || null,
      userId: product.userId,
    };

    this.items.push(newProduct);

    return newProduct;
  }

  async delete(productId: string): Promise<void> {
    const itemIndex = this.items.findIndex(
      (item) => item.id.toString() === productId.toString(),
    );
    if (itemIndex === -1) {
      return null;
    }
    this.items.splice(itemIndex, 1);
  }

  async findAll(
    userId: string,
    { page }: PaginationParams,
  ): Promise<Product[]> {
    const products = this.items
      .filter((item) => item.userId.toString() === userId)
      .slice((page - 1) * 20, page * 20);

    return products;
  }

  async findById(id: string): Promise<Product | null> {
    const product = this.items.find((item) => item.id.toString() === id);
    if (!product) {
      return null;
    }
    return product;
  }

  async update(
    id: string,
    productData: Partial<Product>,
  ): Promise<Product | null> {
    const productIndex = this.items.findIndex((item) => item.id === id);

    if (productIndex === -1) {
      return null;
    }

    const existingProduct = this.items[productIndex];
    const updatedProduct: Product = {
      ...existingProduct,
      ...productData,
      updatedAt: new Date(),
    };

    this.items[productIndex] = updatedProduct;

    return updatedProduct;
  }
}
