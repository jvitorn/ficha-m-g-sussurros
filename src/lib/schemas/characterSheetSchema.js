import { z } from "zod";
import { objectIdSchema } from './objectIdSchema.js';


export const CharacterSheetSchema = z
  .object({
    _id: objectIdSchema.optional(),
    characterName: z
      .string()
      .min(3, "Name too short")
      .max(100, "Name too long"),
    campaignId: objectIdSchema,
    playerId: objectIdSchema,
    classId: objectIdSchema,
    subclassId: objectIdSchema,
    attributes: z.record(z.number().int()),
    attributePoints: z.record(z.number().int()),
    commonSpellsId: objectIdSchema.optional(),
    uniqueSpellsId: objectIdSchema.optional(),
    abilities: objectIdSchema.optional(),
    items: objectIdSchema.optional(),
    personalDefense: z.number().int().min(0, "Defense cannot be negative"),
    resistances: z.record(z.number().int()),
    levelId: objectIdSchema,
    spellConfig: z.record(z.unknown()).optional(),
    createdAt: z.date().default(() => new Date()),
    updatedAt: z.date().default(() => new Date()),
  })
  .strict();

export const CharacterSheetUpdateSchema = CharacterSheetSchema.omit({
  id: true,
  createdAt: true,
})
  .partial()
  .required({
    updatedAt: true,
  });
