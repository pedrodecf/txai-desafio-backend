/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from '@prisma/client';

export function excludePassword(user: User): Omit<User, 'password'> {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export function excludePasswordFromUsers(
  users: User[],
): Omit<User, 'password'>[] {
  return users.map((user) => excludePassword(user));
}
