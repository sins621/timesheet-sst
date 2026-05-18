import { entityNotFound } from "@/lib/constants/errors/domain-errors";
import { validationError } from "@/lib/constants/errors/infra-errors";
import { errAsync } from "neverthrow";
import { getUserWithWarpCredentials } from "../db/queries/user";
import { getWarpAuthToken, getWarpProjects } from "../external/warp";
import { warpEmailSchema } from "../schemas/warp";
import { constructBearerAuthHeaders } from "../utils/common";

export const getUserProjectsRequestModel = (userId: string) => {
  const userWithToken = getUserWithWarpCredentials(userId);

  const warpProjects = () =>
    userWithToken.andThen((user) => {
      if (user == null) return errAsync(entityNotFound("user"));

      if (user.warpCredential.token) {
        return getWarpProjects(
          constructBearerAuthHeaders(user.warpCredential.token),
        );
      }

      const email = warpEmailSchema.safeParse(user.email);

      if (!email.success) {
        return errAsync(validationError(email.error));
      }

      if (!user.warpCredential?.password) {
        return errAsync(entityNotFound("warpPassword"));
      }

      return getWarpAuthToken(email.data, user.warpCredential.password).andThen(
        (token) => getWarpProjects(constructBearerAuthHeaders(token)),
      );
    });

  return {
    warpProjects,
  };
};

export const getUserProjectResponse = () => {};
