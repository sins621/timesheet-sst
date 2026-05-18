import type { AuthHeaders } from "../types/common";
import { z } from "zod";

export const constructBearerAuthHeaders = (token: string): AuthHeaders => {
  return { Authorization: `Bearer ${token}` };
};

export const constructBasicAuthHeaders = (
  username: string,
  password: string,
): AuthHeaders => {
  return {
    Authorization:
      "Basic " + Buffer.from(`${username}:${password}`).toString("base64"),
  };
};

export const parseError = (error: unknown): Error => {
  if (error instanceof Error) return error;

  const parseResult = z.string().safeParse(error);

  if (!parseResult.success)
    return new Error(
      `Error parsing error, issues: ${parseResult.error.issues.toString()}`,
    );

  return new Error(parseResult.data);
};
