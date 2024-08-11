import { faker } from '@faker-js/faker';

export function makeProduct(
  override: Partial<{
    id: string;
    name: string;
    value: number;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
  }> = {},
): {
  id: string;
  name: string;
  value: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
} {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    value: parseFloat(faker.finance.amount()),
    quantity: faker.number.int({ min: 1, max: 100 }),
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: faker.string.uuid(),
    ...override,
  };
}
