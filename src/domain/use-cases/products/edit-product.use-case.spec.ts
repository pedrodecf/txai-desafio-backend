import { InMemoryProductRepository } from 'test/repositories/in-memory-product-repository';
import { makeProduct } from 'test/factories/make-product';
import { EditProductUseCase } from './edit-product.use-case';
import { randomUUID } from 'node:crypto';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

let inMemoryProductRepository: InMemoryProductRepository;
let sut: EditProductUseCase;

describe('Edit Product Use Case', () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository();
    sut = new EditProductUseCase(inMemoryProductRepository);
  });

  it('should be able to edit a product', async () => {
    const product = makeProduct();
    await inMemoryProductRepository.create(product);

    const { product: updatedProduct } = await sut.execute({
      id: product.id,
      userId: product.userId,
      name: 'Updated Product Name',
      value: 200.99,
      quantity: 20,
    });

    expect(updatedProduct).toBeDefined();
    expect(updatedProduct!.name).toBe('Updated Product Name');
    expect(updatedProduct!.value).toBe(200.99);
    expect(updatedProduct!.quantity).toBe(20);
    expect(updatedProduct!.updatedAt).toBeInstanceOf(Date);
    expect(updatedProduct!.userId).toBe(product.userId);
  });

  it('should throw error if product not found', async () => {
    const productId = randomUUID();

    await expect(
      sut.execute({
        id: productId,
        userId: 'user-id',
        name: 'Non-existent Product',
      }),
    ).rejects.toThrow(NotFoundException);
  });

  it('should throw error if user is not authorized to edit the product', async () => {
    const product = makeProduct();
    await inMemoryProductRepository.create(product);

    await expect(
      sut.execute({
        id: product.id,
        userId: 'different-user-id',
        name: 'Updated Product Name',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should be able to edit only the name', async () => {
    const product = makeProduct();
    await inMemoryProductRepository.create(product);

    const { product: updatedProduct } = await sut.execute({
      id: product.id,
      userId: product.userId,
      name: 'Updated Product Name',
    });

    expect(updatedProduct).toBeDefined();
    expect(updatedProduct.name).toBe('Updated Product Name');
    expect(updatedProduct.value).toBe(product.value);
    expect(updatedProduct.quantity).toBe(product.quantity);
  });

  it('should update the updatedAt field when editing a product', async () => {
    const product = makeProduct();
    await inMemoryProductRepository.create(product);

    const { product: updatedProduct } = await sut.execute({
      id: product.id,
      userId: product.userId,
      name: 'Updated Product Name',
    });

    expect(updatedProduct).toBeDefined();
    expect(updatedProduct!.updatedAt).not.toBe(product.updatedAt);
  });
});
