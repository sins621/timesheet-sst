import {
  jiraAvatarUrlsSchema,
  jiraProjectCategorySchema,
  jiraProjectPaginatedSearchSchema,
  jiraProjectSchema,
} from "../schemas/jira";
import { z } from "zod";

export type JiraAvatarUrls = z.infer<typeof jiraAvatarUrlsSchema>;
export type JiraProjectCategory = z.infer<typeof jiraProjectCategorySchema>;
export type JiraProject = z.infer<typeof jiraProjectSchema>;
export type JiraProjectPaginatedSearch = z.infer<
  typeof jiraProjectPaginatedSearchSchema
>;
