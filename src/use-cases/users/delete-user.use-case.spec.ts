import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository';
import { DeleteUserUseCase } from './delete-user.use-case';
import { makeUser } from 'test/factories/make-user';
import { ResourceNotFoundError } from '../errors/resource-not-found.error';
import { randomUUID } from 'crypto';

let inMemoryUserRepository: InMemoryUserRepository;
let sut: DeleteUserUseCase;

describe('Delete User Use Case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    sut = new DeleteUserUseCase(inMemoryUserRepository);
  });

  it('should be able to delete a user', async () => {
    const user = makeUser();
    await inMemoryUserRepository.create(user);

    expect(inMemoryUserRepository.items.length).toBe(1);

    await sut.execute({ userId: user.id.toString() });

    expect(inMemoryUserRepository.items.length).toBe(0);
  });

  it('should throw error if user not found', async () => {
    const userId = randomUUID();

    await expect(sut.execute({ userId })).rejects.toThrow(
      ResourceNotFoundError,
    );
  });
});
