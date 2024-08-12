import { makeUser } from 'test/factories/make-user';
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository';
import { GetUserByUsernameUseCase } from './get-user-by-username.use-case';
import { ResourceNotFoundError } from '../errors/resource-not-found.error';

let inMemoryUserRepository: InMemoryUserRepository;
let sut: GetUserByUsernameUseCase;

describe('Get User By Username Use Case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    sut = new GetUserByUsernameUseCase(inMemoryUserRepository);
  });

  it('should be able to get a user by username', async () => {
    const user = makeUser({
      username: 'username',
    });
    inMemoryUserRepository.create(user);

    const response = await sut.execute({ username: 'username' });
    expect(response.user.username).toEqual('username');
    expect(response.user.id).toBeDefined();
  });

  it('should not be able to get a user by username if it does not exist', async () => {
    await expect(sut.execute({ username: 'inexistent' })).rejects.toThrow(
      ResourceNotFoundError,
    );
  });
});
