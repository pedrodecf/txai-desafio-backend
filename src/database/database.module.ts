import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repository';
import { PrismaProductRepository } from './prisma/repositories/prisma-product-repository';
import { UserRepository } from '@/repositories/user.repository';
import { ProductRepository } from '@/repositories/product.repository';

@Module({
  providers: [
    PrismaService,
    { provide: ProductRepository, useClass: PrismaProductRepository },
    { provide: UserRepository, useClass: PrismaUserRepository },
  ],
  exports: [PrismaService, ProductRepository, UserRepository],
})
export class DatabaseModule {}
