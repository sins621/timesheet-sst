import { got } from "got";
import type { Project } from "../types/jira";
import { projectSchema } from "../schemas/jira";
import type { AuthHeaders } from "../types/common";
import { Result, ResultAsync, err, ok } from "neverthrow";
import { ENDPOINTS as jiraEndpoints } from "../constants/jira";


export async function getProjects(authHeaders: AuthHeaders): Promise<Result<Project[], string>> {
  const result = await ResultAsync.fromPromise(
    got
      (jiraEndpoints.projectSearch.url, {
        headers: authHeaders,
      })
      .json(),
    (e) =>
      new Error(
        `Request to ${jiraEndpoints.projectSearch.url} failed: ${String(e)}`,
      ),
  );
  if (result.isErr())
    return err(`Error getting projects, err: ${result.error}`);

  const parseResult = Result.fromThrowable(
    projectSchema.array().parse,
    (e) => new Error(`Parse failed, err: ${String(e)}`),
  )(result.value);

  if (parseResult.isErr())
    return err(`Project parsing failed, err: ${parseResult.error}`);

  return ok(parseResult.value);
}
