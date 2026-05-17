import { Result } from "neverthrow";
import { DomainError } from "../constants/errors/domain-errors";
import { InfraError } from "../constants/errors/infra-errors";
import { RouteError } from "../constants/errors/route-errors";
import { urlSchema } from "../schemas/common";
import { z } from "zod";

export type Url = z.infer<typeof urlSchema>;
export type Error = InfraError | DomainError | RouteError;
export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export type Endpoint = {
  method: Method;
  url: Url;
};
export type AuthHeaders = { Authorization: string };
export type ApiRequestOptions = {
  params?: Record<string, string | number>;
};

// I'mma keep it real man idk what the hell I was trying here -B.C.
export type ApiRequest<TResponse, TParams> = (
  authHeaders: AuthHeaders,
  searchParams?: TParams,
) => Promise<Result<TResponse, Error>>;

export type OptionItem = {
  label: string;
  value: string;
};

// B.C. This type is used for server action responses or any situation where
// we  are unable to serialze neverthrow objects over the wire
export type ActionResult =
  | { success: true }
  | { success: false; error: string };

// B.C. This type is used for server action responses or any situation where
// we  are unable to serialze neverthrow objects over the wire
export type ActionDataResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };
