"use server";

import { env } from "@/env";
import { getJiraProjects } from "@/lib/external/jira";
import { getWarpAuthToken } from "@/lib/external/warp";
import { constructBasicAuthHeaders } from "@/lib/utils/common";

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

export const getJiraProjectsAction = async () => {
  if (!env.ATLASSIAN_EMAIL_ADDRESS)
    return {
      success: false as const,
      error: "Atlassian Email Address Not Defined",
    };

  return getJiraProjects(
    constructBasicAuthHeaders(
      env.ATLASSIAN_EMAIL_ADDRESS,
      env.ATLASSIAN_CLIENT_SECRET,
    ),
  ).match(
    (projects) => ({
      success: true as const,
      data: projects,
    }),
    (err) => {
      console.error(err);
      return {
        success: false as const,
        error: "Error getting jira projects",
      };
    },
  );
};
