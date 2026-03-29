import nock from "nock";
import { it, describe, expect } from "vitest";
import { getProjects, getPaginatedProjects } from "./jira";
import {
  exampleProject,
  exampleProjectPaginatedSearchResult,
  exampleQueriedProjectPaginatedSearchResult,
} from "../test-data/jira";
import { getTestData } from "../test-data/common";
import { constructBasicAuthHeaders } from "./common";

describe("getProjects", async () => {
  it("it should return an array of projects", async () => {
    const testProjects = getTestData(3, exampleProject);
    const TEST_USER = "john@example.com";
    const TEST_PASSWORD = "abc123";
    const authHeaders = constructBasicAuthHeaders(TEST_USER, TEST_PASSWORD);
    const TEST_AUTH_HEADERS = "Basic am9obkBleGFtcGxlLmNvbTphYmMxMjM=";

    nock("https://warpdevelopment.atlassian.net")
      .get("/rest/api/3/project")
      .matchHeader("Authorization", TEST_AUTH_HEADERS)
      .reply(200, testProjects);

    const result = await getProjects(authHeaders);
    if (result.isErr()) {
      throw new Error(result.error.type);
    }
    expect(result.isOk()).toBe(true);
    expect(result.value).toEqual(testProjects);
  });
});

describe("getProjectsPaginated", async () => {
  it("should return an array of projects", async () => {
    const testPaginatedProjectsResult = exampleProjectPaginatedSearchResult();
    const testUser = "john@example.com";
    const testPassword = "abc123";
    const authHeaders = constructBasicAuthHeaders(testUser, testPassword);
    const TEST_AUTH_HEADERS = "Basic am9obkBleGFtcGxlLmNvbTphYmMxMjM=";

    nock("https://warpdevelopment.atlassian.net")
      .get("/rest/api/3/project/search")
      .matchHeader("Authorization", TEST_AUTH_HEADERS)
      .reply(200, testPaginatedProjectsResult);

    const result = await getPaginatedProjects(authHeaders);

    if (result.isErr()) {
      throw new Error(result.error.type);
    }
    expect(result.isOk()).toBe(true);
    expect(result.value).toEqual(testPaginatedProjectsResult);
  });
  it("should return the details of a specific project when it is queried for", async () => {
    const testPaginatedProjectsResult =
      exampleQueriedProjectPaginatedSearchResult();
    const testUser = "john@example.com";
    const testPassword = "abc123";
    const authHeaders = constructBasicAuthHeaders(testUser, testPassword);
    const TEST_AUTH_HEADERS = "Basic am9obkBleGFtcGxlLmNvbTphYmMxMjM=";
    const QUERY = "lumix";

    nock("https://warpdevelopment.atlassian.net")
      .get(`/rest/api/3/project/search?query=${QUERY}`)
      .matchHeader("Authorization", TEST_AUTH_HEADERS)
      .reply(200, exampleQueriedProjectPaginatedSearchResult);

    const result = await getPaginatedProjects(authHeaders, { query: QUERY });

    if (result.isErr()) {
      if (result.error.type === "ValidationError")
        console.log(result.error.error);
      throw new Error(result.error.type);
    }
    expect(result.isOk()).toBe(true);
    expect(result.value).toEqual(testPaginatedProjectsResult);
  });
});
