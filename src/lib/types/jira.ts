import {
  avatarUrlsSchema,
  projectCategorySchema,
  projectPaginatedSearchSchema,
  projectSchema,
} from "../schemas/jira";
import { z } from "zod";

export type AvatarUrls = z.infer<typeof avatarUrlsSchema>;
export type ProjectCategory = z.infer<typeof projectCategorySchema>;
export type Project = z.infer<typeof projectSchema>;
export type ProjectPaginatedSearch = z.infer<
  typeof projectPaginatedSearchSchema
>;
