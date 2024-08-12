import { makeUser } from 'test/factories/make-user';
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository';
import { GetUserByIDUseCase } from './get-user-by-id.use-case';
import { randomUUID } from 'node:crypto';
import { NotFoundException } from '@nestjs/common';

let inMemoryUserRepository: InMemoryUserRepository;
let sut: GetUserByIDUseCase;

describe('Get User By ID Use Case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    sut = new GetUserByIDUseCase(inMemoryUserRepository);
  });

  it('should be able to get a user by ID', async () => {
    const user = makeUser();
    inMemoryUserRepository.create(user);

    const response = await sut.execute({ userId: user.id.toString() });
    expect(response.user.name).toEqual(user.name);
  });

  it('should not be able to get a user by ID if it does not exist', async () => {
    await expect(sut.execute({ userId: randomUUID() })).rejects.toThrow(
      NotFoundException,
    );
  });
});
