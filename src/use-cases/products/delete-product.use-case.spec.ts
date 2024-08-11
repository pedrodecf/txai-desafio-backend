import { InMemoryProductRepository } from 'test/repositories/in-memory-product-repository';
import { DeleteProductUseCase } from './delete-product.use-case';
import { makeProduct } from 'test/factories/make-product';
import { ResourceNotFoundError } from '../errors/resource-not-found.error';
import { randomUUID } from 'node:crypto';

let inMemoryProductRepository: InMemoryProductRepository;
let sut: DeleteProductUseCase;

describe('Delete Product Use Case', () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository();
    sut = new DeleteProductUseCase(inMemoryProductRepository);
  });

  it('should be able to delete a product', async () => {
    const product = makeProduct();
    await inMemoryProductRepository.create(product);

    expect(inMemoryProductRepository.items.length).toBe(1);

    await sut.execute({ productId: product.id.toString() });

    expect(inMemoryProductRepository.items.length).toBe(0);
  });

  it('should throw error if product not found', async () => {
    const productId = randomUUID();

    await expect(sut.execute({ productId })).rejects.toThrow(
      ResourceNotFoundError,
    );
  });
});
