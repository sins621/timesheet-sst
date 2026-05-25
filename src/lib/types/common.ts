import { Result } from "neverthrow";
import { urlSchema } from "../schemas/common";
import { z } from "zod";

export type Url = z.infer<typeof urlSchema>;
export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export type Endpoint = {
  method: Method;
  url: Url;
};
export type AuthHeaders = { Authorization: string };
export type ApiRequestOptions = {
  params?: Record<string, string | number>;
};

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
