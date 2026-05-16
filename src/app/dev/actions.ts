"use server";

import { env } from "@/env";
import { getWarpAuthToken } from "@/lib/use-cases/warp";

export const getTokenAction = async () => {
  if (!env.WARP_TEST_USERNAME)
    return {
      success: false as const,
      error: "Warp Test Username Not Defined",
    };
  if (!env.WARP_TEST_PASSWORD)
    return {
      success: false as const,
      error: "Warp Test Password Not Defined",
    };

  return getWarpAuthToken(env.WARP_TEST_USERNAME, env.WARP_TEST_PASSWORD).match(
    (token) => ({
      success: true as const,
      data: token,
    }),
    (err) => {
      console.error(err);
      return {
        success: false as const,
        error: "Error getting auth token",
      };
    },
  );
};
