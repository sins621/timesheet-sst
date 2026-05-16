import { z } from "zod";

export const jiraAvatarUrlsSchema = z.object({
  "48x48": z.url(),
  "24x24": z.url(),
  "16x16": z.url(),
  "32x32": z.url(),
});

export const jiraProjectCategorySchema = z.object({
  self: z.url(),
  id: z.union([z.number(), z.string()]),
  name: z.string(),
  description: z.string(),
});

export const jiraProjectSchema = z.object({
  expand: z.string(),
  self: z.url(),
  id: z.union([z.number(), z.string()]),
  key: z.string(),
  name: z.string(),
  avatarUrls: jiraAvatarUrlsSchema,
  projectCategory: jiraProjectCategorySchema.optional(),
  projectTypeKey: z.string(),
  simplified: z.boolean(),
  style: z.string(),
  isPrivate: z.boolean(),
  properties: z.object().optional(),
});

export const jiraProjectPaginatedSearchSchema = z.object({
  self: z.url(),
  nextPage: z.url().optional(),
  maxResults: z.number(),
  startAt: z.number(),
  total: z.number(),
  isLast: z.boolean(),
  values: jiraProjectSchema.array(),
});
