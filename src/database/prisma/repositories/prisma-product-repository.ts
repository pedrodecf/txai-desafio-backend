import { PaginationParams } from '@/utils/paginations-params';
import { Injectable } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { ProductRepository } from '@/domain/repositories/product.repository';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ProductUncheckedCreateInput): Promise<Product> {
    const product = await this.prisma.product.create({
      data,
    });

    return product;
  }

  update(id: string, productData: Partial<Product>): Promise<Product> {
    const product = this.prisma.product.update({
      where: {
        id,
      },
      data: productData,
    });

    return product;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.product.delete({
      where: {
        id,
      },
    });
  }

  async findAll(
    userId: string,
    { page }: PaginationParams,
  ): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return products;
  }
  findById(id: string): Promise<Product | null> {
    const product = this.prisma.product.findUnique({
      where: {
        id,
      },
    });

    return product;
  }
}
