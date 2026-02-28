import { z } from "zod";

export const env = z
  .object({
    BETTER_AUTH_SECRET: z.string().min(1),
    BETTER_AUTH_URL: z.url(),
    DATABASE_URL: z.url(),
  })
  .parse(process.env);
