import { UserRole } from '@prisma/client';
import { faker } from '@faker-js/faker';

export function makeUser(
  override: Partial<{
    id: string;
    name: string;
    role: UserRole;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
  }> = {},
): {
  id: string;
  name: string;
  role: UserRole;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
} {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    role: 'USER',
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...override,
  };
}
