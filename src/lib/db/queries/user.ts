import { ResultAsync } from "neverthrow";
import { databaseError } from "@/lib/constants/errors/infra-errors";
import { db } from "..";
import { parseError } from "@/lib/utils/common";

export const getUser = (userId: string) =>
  ResultAsync.fromPromise(
    db.query.user.findFirst({
      columns: {
        id: true,
        email: true,
        emailVerified: true,
        image: true,
        createdAt: true,
      },
      where: (user, { eq }) => eq(user.id, userId),
    }),
    (e) => databaseError(parseError(e)),
  );

export const getUserWithWarpCredentials = (userId: string) =>
  ResultAsync.fromPromise(
    db.query.user.findFirst({
      columns: {
        id: true,
        email: true,
        emailVerified: true,
        image: true,
        createdAt: true,
      },
      where: (user, { eq }) => eq(user.id, userId),
      with: {
        warpCredential: {
          columns: {
            id: true,
            password: true,
            token: true,
            createdAt: true,
          },
        },
      },
    }),
    (e) => databaseError(parseError(e)),
  );
