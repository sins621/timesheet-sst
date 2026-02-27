import { urlSchema } from "../schemas/common";
import { z } from "zod";

export type Url = z.infer<typeof urlSchema>;

export type Endpoint = {
  method: "GET" | "POST";
  url: Url;
};

export type AuthHeaders = { Authorization: string }
