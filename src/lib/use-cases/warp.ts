import { ENDPOINTS as warpEndpoints } from "../constants/warp";
import type { WarpEmail, Project } from "../types/warp";
import type { AuthHeaders } from "../types/common";
import { Result, ResultAsync, err, ok } from "neverthrow";
import { got } from "got";
import { tokenResponseSchema, projectSchema } from "../schemas/warp";
import * as Errors from "@/lib/constants/errors/infraError";

export async function getAuthToken(
  email: WarpEmail,
  password: string,
): Promise<Result<string, Errors.InfraError>> {
              const result = await ResultAsync.fromPromise(
    got
      .post(warpEndpoints.authorise.url, {
        json: {
          Email: email,
          Password: password,
        },
      })
      .json(),
    (e) => Errors.externalServiceError("Warp Endpoint", e as Error),
  );

  if (result.isErr()) return err(result.error);

  const parseResult = Result.fromThrowable(tokenResponseSchema.parse, (e) =>
    Errors.validationError(e as Error),
  )(result.value);

  if (parseResult.isErr()) return err(parseResult.error);

  return ok(parseResult.value.token);
}

export async function getProjects(
  authHeaders: AuthHeaders,
): Promise<Result<Project[], Errors.InfraError>> {
  const result = await ResultAsync.fromPromise(
    got(warpEndpoints.getProjects.url, {
      headers: authHeaders,
    }).json(),
    (e) => Errors.externalServiceError("Warp Endpoint", e as Error),
  );

  if (result.isErr()) return err(result.error);

  const parseResult = Result.fromThrowable(
    projectSchema.array().parse,
    (e) => Errors.validationError(e as Error),
  )(result.value);

  if (parseResult.isErr()) return err(parseResult.error);

  return ok(parseResult.value);
}
