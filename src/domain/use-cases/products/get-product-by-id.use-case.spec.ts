import { makeProduct } from 'test/factories/make-product';
import { InMemoryProductRepository } from 'test/repositories/in-memory-product-repository';
import { GetProductByIDUseCase } from './get-product-by-id.use-case';
import { randomUUID } from 'node:crypto';
import { NotFoundException } from '@nestjs/common';

let inMemoryProductRepository: InMemoryProductRepository;
let sut: GetProductByIDUseCase;

describe('Get Product By ID Use Case', () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository();
    sut = new GetProductByIDUseCase(inMemoryProductRepository);
  });

  it('should be able to get a product by ID', async () => {
    const product = makeProduct();
    inMemoryProductRepository.create(product);

    const response = await sut.execute({
      productId: product.id.toString(),
      userId: product.userId.toString(),
    });
    expect(response.product).toEqual(product);
  });

  it('should not be able to get a product by ID if it does not exist', async () => {
    await expect(
      sut.execute({
        productId: randomUUID(),
        userId: randomUUID(),
      }),
    ).rejects.toThrow(NotFoundException);
  });
});
