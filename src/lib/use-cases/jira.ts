import * as Errors from "@/lib/constants/errors/infraError";
import { got } from "got";
import { err, ok, ResultAsync } from "neverthrow";
import {
  JIRA_ENDPOINTS as jiraEndpoints,
  JiraProjectPaginatedSearchParams,
} from "../constants/jira";
import { jiraProjectPaginatedSearchSchema, jiraProjectSchema } from "../schemas/jira";
import type { ApiRequest, AuthHeaders } from "../types/common";
import type { JiraProject, JiraProjectPaginatedSearch } from "../types/jira";

export const getJiraProjects = (
  authHeaders: AuthHeaders,
): ResultAsync<JiraProject[], Errors.InfraError> =>
  ResultAsync.fromPromise(
    got(jiraEndpoints.projectSearch.url, {
      headers: authHeaders,
    }).json(),
    (e) => Errors.externalServiceError("Jira Endpoint", e as Error),
  ).andThen((response) => {
    const parsed = jiraProjectSchema.array().safeParse(response);

    if (!parsed.success) return err(Errors.validationError(parsed.error));

    return ok(parsed.data);
  });

export const getJiraPaginatedProjects: ApiRequest<
  JiraProjectPaginatedSearch,
  JiraProjectPaginatedSearchParams
> = async (authHeaders, searchParams) =>
  ResultAsync.fromPromise(
    got(jiraEndpoints.projectPaginatedSearch.url, {
      headers: authHeaders,
      searchParams: new URLSearchParams(searchParams),
    }).json(),
    (e) => Errors.externalServiceError("Jira Endpoint", e as Error),
  ).andThen((response) => {
    const parsed = jiraProjectPaginatedSearchSchema.safeParse(response);

    if (!parsed.success) return err(Errors.validationError(parsed.error));

    return ok(parsed.data);
  });
