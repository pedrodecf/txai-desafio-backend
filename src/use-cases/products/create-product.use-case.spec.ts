import { makeProduct } from 'test/factories/make-product';
import { CreateProductUseCase } from './create-product.use-case';
import { InMemoryProductRepository } from 'test/repositories/in-memory-product-repository';

let inMemoryProductRepository: InMemoryProductRepository;
let sut: CreateProductUseCase;

describe('Create Product Use Case', () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository();
    sut = new CreateProductUseCase(inMemoryProductRepository);
  });

  it('should be able to create a product', async () => {
    const productCreated = makeProduct();
    const { product } = await sut.execute(productCreated);

    expect(product.id).toBeDefined();
    expect(inMemoryProductRepository.items[0].id).toEqual(product.id);
    expect(product.createdAt).toBeInstanceOf(Date);
  });
});
