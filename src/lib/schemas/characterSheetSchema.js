import { z } from "zod";

export const CharacterSheetSchema = z
  .object({
    id: z.string().uuid().optional(),
    characterName: z
      .string()
      .min(3, "Name too short")
      .max(100, "Name too long"),
    campaignId: z.string().uuid(),
    playerId: z.string().uuid(),
    classId: z.string().uuid(),
    subclassId: z.string().uuid().optional(),
    attributes: z.record(z.number().int()),
    attributePoints: z.record(z.number().int()),
    commonSpells: z.array(z.string().uuid()).default([]).optional(),
    uniqueSpells: z.array(z.string().uuid()).default([]).optional(),
    abilities: z.array(z.string().uuid()).default([]).optional(),
    items: z.array(z.string().uuid()).default([]).optional(),
    personalDefense: z.number().int().min(0, "Defense cannot be negative"),
    resistances: z.record(z.number().int()),
    levelId: z.string().uuid(),
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
