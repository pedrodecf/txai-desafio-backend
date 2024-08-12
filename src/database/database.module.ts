import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repository';
import { PrismaProductRepository } from './prisma/repositories/prisma-product-repository';
import { ProductRepository } from '@/domain/repositories/product.repository';
import { UserRepository } from '@/domain/repositories/user.repository';

@Module({
  providers: [
    PrismaService,
    { provide: ProductRepository, useClass: PrismaProductRepository },
    { provide: UserRepository, useClass: PrismaUserRepository },
  ],
  exports: [PrismaService, ProductRepository, UserRepository],
})
export class DatabaseModule {}
