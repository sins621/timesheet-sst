import { faker } from "@faker-js/faker";
import type { Project, ProjectClient } from "../types/warp";

const CURRENCIES = ["South African Rand", "Great Britain Pound", "US Dollar"];

export const exampleClient = (overrides?: Partial<ProjectClient>) => ({
  ...{
    GroupId: faker.number.int({ min: 0, max: 9 }),
    Name: faker.lorem.word(),
    Currency: faker.helpers.arrayElement(CURRENCIES),
  },
  ...overrides,
});

export const exampleProject = (overrides?: Partial<Project>) => ({
  ...{
    TaskId: faker.number.int({ min: 0, max: 9 }),
    Name: faker.lorem.word(),
    IsActive: faker.datatype.boolean(),
    Created_On: faker.date.anytime().toISOString(),
    Updated_On: faker.date.anytime().toISOString(),
    Client: exampleClient(),
  },
  ...overrides,
});
