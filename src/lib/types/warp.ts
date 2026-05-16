import { z } from "zod";
import {
  warpCostCodeIDSchema,
  warpEmailSchema,
  warpEntrySchema,
  warpProjectClientSchema,
  warpProjectSchema,
  warpTimeSchema,
} from "../schemas/warp";

export type WarpCostCodeID = z.infer<typeof warpCostCodeIDSchema>;
export type WarpTime = z.infer<typeof warpTimeSchema>;

export type WarpProjectClient = z.infer<typeof warpProjectClientSchema>;
export type WarpProject = z.infer<typeof warpProjectSchema>;

export type WarpEntry = z.infer<typeof warpEntrySchema>;

export type WarpEmail = z.infer<typeof warpEmailSchema>;

export type WarpProjectView = {
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
