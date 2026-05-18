import { ResultAsync } from "neverthrow";
import { db } from "..";
import { databaseError } from "@/lib/constants/errors/infra-errors";
import { parseError } from "@/lib/utils/common";
import { warpAuthCredential } from "../schema";

export const updateWarpAuthCredentials = ({
  userId,
  token,
  password,
}: {
  userId: string;
  token: string;
  password?: string;
}) =>
  ResultAsync.fromPromise(
    db
      .insert(warpAuthCredential)
      .values({
        userId,
        token,
        ...(password && { password }),
      })
      .onConflictDoUpdate({
        target: warpAuthCredential.userId,
        set: {
          token,
          ...(password && { password }),
        },
      })
      .returning(),
    (e) => databaseError(parseError(e)),
  ).map(([result]) => result.id);
