import { makeUser } from 'test/factories/make-user';
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository';
import { EmailAlreadyInUseError } from '../errors/email-already-in-use.error';
import { UsernameAlreadyInUseError } from '../errors/username-already-in-use.error';
import { CreateUserUseCase } from './create-user.use-case';
import { compare } from 'bcryptjs';

let inMemoryUserRepository: InMemoryUserRepository;
let sut: CreateUserUseCase;

describe('Create User Use Case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    sut = new CreateUserUseCase(inMemoryUserRepository);
  });

  it('should be able to create a user', async () => {
    const user = makeUser({
      email: 'any_email@test.com',
    });
    await sut.execute(user);

    const userCreated = inMemoryUserRepository.items[0];

    expect(userCreated.id).toBeDefined();
    expect(userCreated.createdAt).toBeInstanceOf(Date);
    expect(userCreated.email).toBe('any_email@test.com');
    expect(userCreated.role).toBe('USER');
  });

  it('should not be able to create a user with an email that is already in use', async () => {
    const EMAIL_FOR_TEST = 'email@test.com';

    const existingUser = makeUser({
      email: EMAIL_FOR_TEST,
    });

    await sut.execute({
      email: existingUser.email,
      name: existingUser.name,
      password: existingUser.password,
      username: existingUser.username,
    });

    await expect(
      sut.execute({
        email: EMAIL_FOR_TEST,
        name: 'any_name',
        password: 'any_password',
        username: 'any_username',
      }),
    ).rejects.toThrow(EmailAlreadyInUseError);
  });

  it('should not be able to create a user with an username that is already in use', async () => {
    const USERNAME_FOR_TEST = 'username';

    const user1 = makeUser({
      username: USERNAME_FOR_TEST,
    });

    await sut.execute(user1);

    const user2 = makeUser({
      username: USERNAME_FOR_TEST,
    });

    await expect(sut.execute(user2)).rejects.toThrow(UsernameAlreadyInUseError);
  });

  it('should hash the password before saving it', async () => {
    const PASSWORD_FOR_TEST = 'any_password';

    await sut.execute({
      email: 'any_email',
      name: 'any_name',
      password: PASSWORD_FOR_TEST,
      username: 'any_username',
    });

    const isPasswordHashed = await compare(
      PASSWORD_FOR_TEST,
      inMemoryUserRepository.items[0].password,
    );

    expect(inMemoryUserRepository.items[0].password).not.toBe(
      PASSWORD_FOR_TEST,
    );
    expect(isPasswordHashed).toBe(true);
  });
});
