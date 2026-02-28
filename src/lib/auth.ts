import { env } from "../env";
import { db } from "@/lib/db/index";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  socialProviders: {
    microsoft: {
      clientId: env.MICROSOFT_CLIENT_ID,
      clientSecret: env.MICROSOFT_CLIENT_SECRET,
      tenantId: env.MICROSOFT_TENANT_ID,
    },
    atlassian: {
      clientId: env.ATLASSIAN_CLIENT_ID,
      clientSecret: env.ATLASSIAN_CLIENT_SECRET,
      scope: ["read:jira-user", "read:me", "read:account"],
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["atlassian"],
    },
  },
  plugins: [nextCookies()],
});
