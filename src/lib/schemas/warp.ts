import { z } from "zod";
import { WARP_COST_CODE_IDS } from "../constants/warp";

export const warpTokenResponseSchema = z.object({
  token: z.string(),
});

export const warpDomainRegex = /@[A-Za-z]+\.[A-Za-z]+/i;
export const warpEmailSchema = z
  .email({ pattern: warpDomainRegex })
  .brand<"warpEmail">();
export const warpApiBool = z.union([z.literal(0), z.literal(1)]);
export const warpCostCodeIDSchema = z.enum(WARP_COST_CODE_IDS);

export const warpTimeSchema = z.iso
  .datetime({ local: true })
  .brand<"warpTime">();

export const warpProjectClientSchema = z
  .object({
    GroupId: z.number(),
    Name: z.string(),
    Currency: z.string(),
  })
  .brand<"warpProjectClient">();

export const warpProjectSchema = z
  .object({
    TaskId: z.number(),
    Name: z.string(),
    IsActive: z.boolean(),
    Created_On: warpTimeSchema,
    Updated_On: warpTimeSchema,
    Client: warpProjectClientSchema,
  })
  .brand<"warpProject">();

export const warpEntrySchema = z
  .object({
    TaskId: z.number(),
    PersonId: z.number(),
    CostCodeId: warpCostCodeIDSchema,
    DepartmentId: z.number(),
    Overtime: warpApiBool,
    EntryDate: warpTimeSchema,
    Comments: z.string(),
    WorkLogId: warpApiBool,
    Audited: warpApiBool,
  })
  .brand<"warpEntry">();
