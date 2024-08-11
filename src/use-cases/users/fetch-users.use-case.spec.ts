import { makeUser } from 'test/factories/make-user';
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository';
import { FetchUsersUseCase } from './fetch-users.use-case';

let inMemoryUserRepository: InMemoryUserRepository;
let sut: FetchUsersUseCase;

describe('Fetch Users Use Case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    sut = new FetchUsersUseCase(inMemoryUserRepository);
  });

  it('should be able to get all users', async () => {
    const user = makeUser();
    inMemoryUserRepository.create(user);

    const user2 = makeUser();
    inMemoryUserRepository.create(user2);

    const response = await sut.execute({ page: 1 });
    expect(response.users.length).toBe(2);
    expect(response.users[0]).toEqual(user);
    expect(response.users[1]).toEqual(user2);
  });

  it('should be able to fetch paginated users', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryUserRepository.create(
        makeUser({
          username: `user-${i}`,
        }),
      );
    }

    const response = await sut.execute({ page: 2 });
    expect(response.users.length).toBe(2);
    expect(response.users[0].username).toBe('user-21');
    expect(response.users[1].username).toBe('user-22');
  });

  it('must be able to return an empty array if there are no users', async () => {
    const response = await sut.execute({ page: 1 });
    expect(response.users.length).toBe(0);
    expect(response.users).toEqual([]);
  });
});
