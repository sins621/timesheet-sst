import {
  type InfraError,
  externalServiceError,
  validationError,
} from "@/lib/constants/errors/infra-errors";
import { got } from "got";
import { ResultAsync, err, ok } from "neverthrow";
import { WARP_ENDPOINTS } from "../constants/warp";
import { warpProjectSchema, warpTokenResponseSchema } from "../schemas/warp";
import type { AuthHeaders } from "../types/common";
import type { WarpProject, WarpEmail } from "../types/warp";

export const getWarpAuthToken = (
  email: WarpEmail,
  password: string,
): ResultAsync<string, InfraError> =>
  ResultAsync.fromPromise(
    got
      .post(WARP_ENDPOINTS.authorise.url, {
        json: {
          Email: email,
          Password: password,
        },
      })
      .json(),
    (e) => externalServiceError("Warp Endpoint", e as Error),
  ).andThen((response) => {
    const parsed = warpTokenResponseSchema.safeParse(response);

    if (!parsed.success) return err(validationError(parsed.error));

    return ok(parsed.data.token);
  });

export const getWarpProjects = (
  authHeaders: AuthHeaders,
): ResultAsync<WarpProject[], InfraError> =>
  ResultAsync.fromPromise(
    got(WARP_ENDPOINTS.getProjects.url, {
      headers: authHeaders,
    }).json(),
    (e) => externalServiceError("Warp Endpoint", e as Error),
  ).andThen((response) => {
    const parsed = warpProjectSchema.array().safeParse(response);

    if (!parsed.success) return err(validationError(parsed.error));

    return ok(parsed.data);
  });
