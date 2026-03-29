import { urlSchema } from "../schemas/common";
import { Endpoint } from "../types/common";

export const API_URL = "https://warpdevelopment.atlassian.net/rest/api/3/";
export const ENDPOINTS: Record<string, Endpoint> = {
  projectSearch: {
    method: "GET",
    url: urlSchema.parse(API_URL + "project"),
  },
  projectPaginatedSearch: {
    method: "GET",
    url: urlSchema.parse(API_URL + "project/search"),
  },
};

export type ProjectPaginatedSearchParams = {
  query?: string;
};
