import * as Errors from "@/lib/constants/errors/infraError";
import { got } from "got";
import { err, ok, ResultAsync } from "neverthrow";
import {
  ENDPOINTS as jiraEndpoints,
  ProjectPaginatedSearchParams,
} from "../constants/jira";
import { projectPaginatedSearchSchema, projectSchema } from "../schemas/jira";
import type { ApiRequest, AuthHeaders } from "../types/common";
import type { Project, ProjectPaginatedSearch } from "../types/jira";

export const getProjects = (
  authHeaders: AuthHeaders,
): ResultAsync<Project[], Errors.InfraError> =>
  ResultAsync.fromPromise(
    got(jiraEndpoints.projectSearch.url, {
      headers: authHeaders,
    }).json(),
    (e) => Errors.externalServiceError("Jira Endpoint", e as Error),
  ).andThen((response) => {
    const parsed = projectSchema.array().safeParse(response);

    if (!parsed.success) return err(Errors.validationError(parsed.error));

    return ok(parsed.data);
  });

export const getPaginatedProjects: ApiRequest<
  ProjectPaginatedSearch,
  ProjectPaginatedSearchParams
> = async (authHeaders, searchParams) =>
  ResultAsync.fromPromise(
    got(jiraEndpoints.projectPaginatedSearch.url, {
      headers: authHeaders,
      searchParams: new URLSearchParams(searchParams),
    }).json(),
    (e) => Errors.externalServiceError("Jira Endpoint", e as Error),
  ).andThen((response) => {
    const parsed = projectPaginatedSearchSchema.safeParse(response);

    if (!parsed.success) return err(Errors.validationError(parsed.error));

    return ok(parsed.data);
  });
