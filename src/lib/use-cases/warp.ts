import * as Errors from "@/lib/constants/errors/infraError";
import { got } from "got";
import { ResultAsync, err, ok } from "neverthrow";
import { ENDPOINTS as warpEndpoints } from "../constants/warp";
import { projectSchema, tokenResponseSchema } from "../schemas/warp";
import type { AuthHeaders } from "../types/common";
import type { Project, WarpEmail } from "../types/warp";

export const getAuthToken = (
  email: WarpEmail,
  password: string,
): ResultAsync<string, Errors.InfraError> =>
  ResultAsync.fromPromise(
    got
      .post(warpEndpoints.authorise.url, {
        json: {
          Email: email,
          Password: password,
        },
      })
      .json(),
    (e) => Errors.externalServiceError("Warp Endpoint", e as Error),
  ).andThen((response) => {
    const parsed = tokenResponseSchema.safeParse(response);

    if (!parsed.success) return err(Errors.validationError(parsed.error));

    return ok(parsed.data.token);
  });

export const getProjects = (
  authHeaders: AuthHeaders,
): ResultAsync<Project[], Errors.InfraError> =>
  ResultAsync.fromPromise(
    got(warpEndpoints.getProjects.url, {
      headers: authHeaders,
    }).json(),
    (e) => Errors.externalServiceError("Warp Endpoint", e as Error),
  ).andThen((response) => {
    const parsed = projectSchema.array().safeParse(response);

    if (!parsed.success) return err(Errors.validationError(parsed.error));

    return ok(parsed.data);
  });
