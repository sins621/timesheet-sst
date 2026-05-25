import {
  type AppError,
  externalServiceError,
  validationError,
} from "@/lib/constants/errors";
import { got } from "got";
import { err, ok, ResultAsync } from "neverthrow";
import {
  JIRA_ENDPOINTS as jiraEndpoints
} from "../constants/jira";
import {
  jiraProjectPaginatedSearchSchema,
  jiraProjectSchema,
} from "../schemas/jira";
import type { AuthHeaders } from "../types/common";
import type { JiraProject } from "../types/jira";

export const getJiraProjects = (
  authHeaders: AuthHeaders,
): ResultAsync<JiraProject[], AppError> =>
  ResultAsync.fromPromise(
    got(jiraEndpoints.projectSearch.url, {
      headers: authHeaders,
    }).json(),
    (e) => externalServiceError("Jira Endpoint", e as Error),
  ).andThen((response) => {
    const parsed = jiraProjectSchema.array().safeParse(response);

    if (!parsed.success) return err(validationError(parsed.error));

    return ok(parsed.data);
  });

export const getJiraPaginatedProjects = async (
  authHeaders: AuthHeaders,
  searchParams: {
    query?: string;
  },
) =>
  ResultAsync.fromPromise(
    got(jiraEndpoints.projectPaginatedSearch.url, {
      headers: authHeaders,
      searchParams: new URLSearchParams(searchParams),
    }).json(),
    (e) => externalServiceError("Jira Endpoint", e as Error),
  ).andThen((response) => {
    const parsed = jiraProjectPaginatedSearchSchema.safeParse(response);

    if (!parsed.success) return err(validationError(parsed.error));

    return ok(parsed.data);
  });
