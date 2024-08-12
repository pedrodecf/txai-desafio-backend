import { makeUser } from 'test/factories/make-user';
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository';
import { GetUserByEmailUseCase } from './get-user-by-email.use-case';
import { ResourceNotFoundError } from '../errors/resource-not-found.error';

let inMemoryUserRepository: InMemoryUserRepository;
let sut: GetUserByEmailUseCase;

describe('Get User By Email Use Case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    sut = new GetUserByEmailUseCase(inMemoryUserRepository);
  });

  it('should be able to get a user by email', async () => {
    const user = makeUser({
      email: 'email@test.com',
    });
    inMemoryUserRepository.create(user);

    const response = await sut.execute({ email: 'email@test.com' });
    expect(response.user.email).toEqual('email@test.com');
    expect(response.user.id).toBeDefined();
  });

  it('should not be able to get a user by email if it does not exist', async () => {
    await expect(
      sut.execute({ email: 'email@inexistent.com' }),
    ).rejects.toThrow(ResourceNotFoundError);
  });
});
