import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository';
import { makeUser } from 'test/factories/make-user';
import { EditUserUseCase } from './edit-user.use-case';
import { randomUUID } from 'node:crypto';
import { UserRole } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';

let inMemoryUserRepository: InMemoryUserRepository;
let sut: EditUserUseCase;

describe('Edit User Use Case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    sut = new EditUserUseCase(inMemoryUserRepository);
  });

  it('should be able to edit a user', async () => {
    const user = makeUser();
    await inMemoryUserRepository.create(user);

    const updatedUserProps = {
      userId: user.id,
      name: 'Updated User Name',
      role: 'ADMIN' as UserRole,
      username: 'updatedusername',
      email: 'updatedemail@example.com',
    };

    const { user: updatedUser } = await sut.execute(updatedUserProps);

    expect(updatedUser).toBeDefined();
    expect(updatedUser.name).toBe(updatedUserProps.name);
    expect(updatedUser.role).toBe(updatedUserProps.role);
    expect(updatedUser.username).toBe(updatedUserProps.username);
    expect(updatedUser.email).toBe(updatedUserProps.email);
    expect(updatedUser.password).toBe(user.password);
  });

  it('should throw error if user not found', async () => {
    const userId = randomUUID();

    await expect(
      sut.execute({
        userId,
        name: 'Non-existent User',
      }),
    ).rejects.toThrow(NotFoundException);
  });

  it('should be able to edit only the username', async () => {
    const user = makeUser();
    await inMemoryUserRepository.create(user);

    const { user: updatedUser } = await sut.execute({
      userId: user.id,
      username: 'updatedusername',
    });

    expect(updatedUser).toBeDefined();
    expect(updatedUser.name).toBe(user.name);
    expect(updatedUser.username).toBe('updatedusername');
    expect(updatedUser.email).toBe(user.email);
  });

  it('should update the updatedAt field when editing a user', async () => {
    const user = makeUser();
    await inMemoryUserRepository.create(user);

    const { user: updatedUser } = await sut.execute({
      userId: user.id,
      name: 'Updated User Name',
    });

    expect(updatedUser).toBeDefined();
    expect(updatedUser.updatedAt).not.toBe(user.updatedAt);
  });

  it('should throw error if user inexist', async () => {
    const user = makeUser();
    await inMemoryUserRepository.create(user);

    await expect(
      sut.execute({
        userId: 'different-user-id',
        name: 'Updated User Name',
      }),
    ).rejects.toThrow(NotFoundException);
  });
});
