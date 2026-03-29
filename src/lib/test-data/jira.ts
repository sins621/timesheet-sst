import { faker } from "@faker-js/faker";
import type { Project, ProjectPaginatedSearch } from "../types/jira";
import { getTestData } from "./common";

const FIELDS = [
  "description",
  "lead",
  "issueTypes",
  "url",
  "projectKeys",
  "permissions",
  "insight",
];

export const exampleProject = (overrides?: Partial<Project>) => ({
  ...{
    expand: faker.helpers
      .arrayElements(FIELDS, { min: 1, max: FIELDS.length })
      .join(","),
    self: faker.internet.url(),
    id: faker.number.int({ min: 10000, max: 99999 }),
    key: faker.lorem.word(3).toUpperCase(),
    name: faker.lorem.word(),
    avatarUrls: {
      "48x48": faker.internet.url(),
      "24x24": faker.internet.url(),
      "16x16": faker.internet.url(),
      "32x32": faker.internet.url(),
    },
    projectCategory: {
      self: faker.internet.url(),
      id: faker.number.int({ min: 10000, max: 99999 }),
      name: faker.lorem.word(),
      description: "",
    },
    projectTypeKey: faker.lorem.word(),
    simplified: faker.datatype.boolean(),
    style: "classic",
    isPrivate: faker.datatype.boolean(),
    properties: {},
  },
  ...overrides,
});

export const exampleProjectPaginatedSearchResult = (
  overrides?: Partial<ProjectPaginatedSearch>,
) => ({
  ...{
    self: faker.internet.url(),
    nextPage: faker.internet.url(),
    maxResults: faker.number.int({ min: 0, max: 1000 }),
    startAt: faker.number.int({ min: 0, max: 1000 }),
    total: faker.number.int({ min: 0, max: 1000 }),
    isLast: faker.datatype.boolean(),
    values: getTestData(10, exampleProject),
  },
  ...overrides,
});

export const exampleQueriedProjectPaginatedSearchResult = (
  overrides?: Partial<ProjectPaginatedSearch>,
) => ({
  ...{
    self: "https://warpdevelopment.atlassian.net/rest/api/3/project/search?maxResults=50&query=lumix&startAt=0",
    maxResults: 50,
    startAt: 0,
    total: 1,
    isLast: true,
    values: [
      {
        expand:
          "description,lead,issueTypes,url,projectKeys,permissions,insight",
        self: "https://warpdevelopment.atlassian.net/rest/api/3/project/10666",
        id: "10666",
        key: "LUM",
        name: "Lumix",
        avatarUrls: {
          "48x48":
            "https://warpdevelopment.atlassian.net/rest/api/3/universal_avatar/view/type/project/avatar/10400",
          "24x24":
            "https://warpdevelopment.atlassian.net/rest/api/3/universal_avatar/view/type/project/avatar/10400?size=small",
          "16x16":
            "https://warpdevelopment.atlassian.net/rest/api/3/universal_avatar/view/type/project/avatar/10400?size=xsmall",
          "32x32":
            "https://warpdevelopment.atlassian.net/rest/api/3/universal_avatar/view/type/project/avatar/10400?size=medium",
        },
        projectCategory: {
          self: "https://warpdevelopment.atlassian.net/rest/api/3/projectCategory/10000",
          id: "10000",
          name: "Bespoke",
          description: "",
        },
        projectTypeKey: "software",
        simplified: false,
        style: "classic",
        isPrivate: false,
        properties: {},
      },
    ],
  },
  ...overrides,
});
