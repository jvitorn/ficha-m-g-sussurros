import { z } from "zod";
import { objectIdSchema } from "./objectIdSchema.js";

export const CampaignSchema = z
  .object({
    _id: objectIdSchema.optional(),
    name: z.string().min(3, "Name too short").max(100, "Name too long"),
    synopsis: z.string().optional(),
    story: z.string().optional(),
    progress: z.string().optional(),
    advantages: z.array(z.string()).default([]).optional(),
    disadvantages: z.array(z.string()).default([]).optional(),
    createdAt: z.date().default(() => new Date()),
    updatedAt: z.date().default(() => new Date()),
  })
  .strict();

export const CampaignUpdateSchema = CampaignSchema.omit({
  id: true,
  createdAt: true,
})
  .partial()
  .required({
    updatedAt: true,
  });
