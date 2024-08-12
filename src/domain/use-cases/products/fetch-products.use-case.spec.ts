import { makeProduct } from 'test/factories/make-product';
import { makeUser } from 'test/factories/make-user';
import { InMemoryProductRepository } from 'test/repositories/in-memory-product-repository';
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository';
import { FetchProductsUseCase } from './fetch-products.use-case';
import { randomUUID } from 'node:crypto';

let inMemoryProductRepository: InMemoryProductRepository;
let inMemoryUserRepository: InMemoryUserRepository;
let sut: FetchProductsUseCase;

describe('Fetch Products Use Case', () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository();
    inMemoryUserRepository = new InMemoryUserRepository();
    sut = new FetchProductsUseCase(inMemoryProductRepository);
  });

  it('should be able to get all products', async () => {
    const user = makeUser();
    inMemoryUserRepository.create(user);

    const product = makeProduct({
      userId: user.id,
    });
    inMemoryProductRepository.create(product);
    const product2 = makeProduct({
      userId: user.id,
    });
    inMemoryProductRepository.create(product2);

    const response = await sut.execute({ userId: user.id.toString(), page: 1 });
    expect(response.products.length).toBe(2);
    expect(response.products[0]).toEqual(product);
    expect(response.products[1]).toEqual(product2);
  });

  it('should be able to fetch paginated products', async () => {
    const randomID = randomUUID();

    for (let i = 1; i <= 22; i++) {
      await inMemoryProductRepository.create(
        makeProduct({
          userId: randomID,
          name: `Product ${i}`,
        }),
      );
    }

    const response = await sut.execute({ userId: randomID, page: 2 });
    expect(response.products.length).toBe(2);
    expect(response.products[0].name).toBe('Product 21');
    expect(response.products[1].name).toBe('Product 22');
  });

  it('must be able to return an empty array if there are no products', async () => {
    const response = await sut.execute({ userId: 'inexistent-user', page: 1 });
    expect(response.products.length).toBe(0);
    expect(response.products).toEqual([]);
  });
});
