import { z } from "zod";
import {
  costCodeIDSchema,
  emailSchema,
  entrySchema,
  projectClientSchema,
  projectSchema,
  timeSchema,
} from "../schemas/warp";

export type CostCodeID = z.infer<typeof costCodeIDSchema>;
export type WarpTime = z.infer<typeof timeSchema>;

export type ProjectClient = z.infer<typeof projectClientSchema>;
export type Project = z.infer<typeof projectSchema>;

export type Entry = z.infer<typeof entrySchema>;

export type WarpEmail = z.infer<typeof emailSchema>;

export type ProjectView = {
  name: string;
  groupId: number;
  currency: string;
  projects: {
    taskId: number;
    name: string;
    createdOn: Date;
    updatedOn: Date;
  }[];
};
