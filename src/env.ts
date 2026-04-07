import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.url(),
    BETTER_AUTH_URL: z.url(),
    BETTER_AUTH_SECRET: z.string().min(1),
    MICROSOFT_CLIENT_ID: z.string().min(1),
    MICROSOFT_CLIENT_SECRET: z.string().min(1),
    MICROSOFT_TENANT_ID: z.string().min(1),
    ATLASSIAN_CLIENT_ID: z.string().min(1),
    ATLASSIAN_CLIENT_SECRET: z.string().min(1),
    APP_ENV: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_ENABLE_MSW_MOCK: z.coerce.boolean(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    MICROSOFT_CLIENT_ID: process.env.MICROSOFT_CLIENT_ID,
    MICROSOFT_CLIENT_SECRET: process.env.MICROSOFT_CLIENT_SECRET,
    MICROSOFT_TENANT_ID: process.env.MICROSOFT_TENANT_ID,
    ATLASSIAN_CLIENT_ID: process.env.ATLASSIAN_CLIENT_ID,
    ATLASSIAN_CLIENT_SECRET: process.env.ATLASSIAN_CLIENT_SECRET,
    APP_ENV: process.env.APP_ENV,
    NEXT_PUBLIC_ENABLE_MSW_MOCK: process.env.NEXT_PUBLIC_ENABLE_MSW_MOCK,
  },
});
