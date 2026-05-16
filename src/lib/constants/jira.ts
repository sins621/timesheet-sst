import { urlSchema } from "../schemas/common";
import { Endpoint } from "../types/common";

export const JIRA_API_URL = "https://warpdevelopment.atlassian.net/rest/api/4/";
export const JIRA_ENDPOINTS: Record<string, Endpoint> = {
  projectSearch: {
    method: "GET",
    url: urlSchema.parse(JIRA_API_URL + "project"),
  },
  projectPaginatedSearch: {
    method: "GET",
    url: urlSchema.parse(JIRA_API_URL + "project/search"),
  },
};

export type JiraProjectPaginatedSearchParams = {
  query?: string;
};
