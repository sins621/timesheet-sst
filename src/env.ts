import { z } from "zod";

export const env = z
  .object({
    DATABASE_URL: z.url(),
    BETTER_AUTH_URL: z.url(),
    BETTER_AUTH_SECRET: z.string().min(1),
    MICROSOFT_CLIENT_ID: z.string().min(1),
    MICROSOFT_CLIENT_SECRET: z.string().min(1),
    MICROSOFT_TENANT_ID: z.string().min(1),
    ATLASSIAN_CLIENT_ID: z.string().min(1),
    ATLASSIAN_CLIENT_SECRET: z.string().min(1),
  })
  .parse(process.env);
  