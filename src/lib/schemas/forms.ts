import z from "zod";

export const stubInputSchema = z.object({
  type: z.string().min(1),
  statusA: z.string(),
  statusB: z.string().optional(),
  messageTemplate: z.string(),
});
