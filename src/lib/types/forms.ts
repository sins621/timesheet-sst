import z from "zod";
import { stubInputSchema } from "../schemas/forms";

export type StubInputSchema = z.infer<typeof stubInputSchema>;
export type StubTypeInputSchema = Pick<StubInputSchema, "type">;
export type StubStatusInputSchema = Pick<
  StubInputSchema,
  "statusA" | "statusB"
>;
export type StubMessageInputSchema = Pick<StubInputSchema, "messageTemplate">;
