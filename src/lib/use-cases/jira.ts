import { got } from "got";
import type { Project, ProjectPaginatedSearch } from "../types/jira";
import { projectPaginatedSearchSchema, projectSchema } from "../schemas/jira";
import type { ApiRequest, AuthHeaders } from "../types/common";
import { Result, ResultAsync, err, ok } from "neverthrow";
import {
  ENDPOINTS as jiraEndpoints,
  ProjectPaginatedSearchParams,
} from "../constants/jira";
import * as Errors from "@/lib/constants/errors/infraError";

export async function getProjects(
  authHeaders: AuthHeaders,
): Promise<Result<Project[], Errors.InfraError>> {
  const result = await ResultAsync.fromPromise(
    got(jiraEndpoints.projectSearch.url, {
      headers: authHeaders,
    }).json(),
    (e) => Errors.externalServiceError("Jira Endpoint", e as Error),
  );

  if (result.isErr()) return err(result.error);

  const parseResult = Result.fromThrowable(projectSchema.array().parse, (e) =>
    Errors.validationError(e as Error),
  )(result.value);

  if (parseResult.isErr()) return err(parseResult.error);

  return ok(parseResult.value);
}

export const getPaginatedProjects: ApiRequest<
  ProjectPaginatedSearch,
  ProjectPaginatedSearchParams
> = async (authHeaders, searchParams) => {
  const result = await ResultAsync.fromPromise(
    got(jiraEndpoints.projectPaginatedSearch.url, {
      headers: authHeaders,
      searchParams: new URLSearchParams(searchParams),
    }).json(),
    (e) => Errors.externalServiceError("Jira Endpoint", e as Error),
  );

  if (result.isErr()) return err(result.error);

  const parseResult = Result.fromThrowable(
    projectPaginatedSearchSchema.parse,
    (e) => Errors.validationError(e as Error),
  )(result.value);

  if (parseResult.isErr()) return err(parseResult.error);

  return ok(parseResult.value);
};
