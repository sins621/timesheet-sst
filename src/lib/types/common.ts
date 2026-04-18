import { Result } from "neverthrow";
import { DomainError } from "../constants/errors/domainErrors";
import { InfraError } from "../constants/errors/infraError";
import { RouteError } from "../constants/errors/routeErrors";
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
export type ApiRequest<TResponse, TParams> = (
  authHeaders: AuthHeaders,
  searchParams?: TParams,
) => Promise<Result<TResponse, Error>>;

export type OptionItem = {
  label: string;
  value: string;
}