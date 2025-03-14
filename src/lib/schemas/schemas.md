Aqui está a versão atualizada do seu `schemas.md` com os nomes das coleções e schemas em inglês, e os schemas gerados em Zod, seguindo o exemplo que você forneceu:


# MongoDB Database for M&G System

This document describes all collections in the MongoDB database for the RPG System - Mages & Grimoires, with validation via `$jsonSchema` and fields in English.

---

## 1. Collection: `users`
**Purpose**: Store user data.

```typescript
import { z } from 'zod';

export const UserSchema = z.object({
  // Existing fields
  id: z.string().uuid().optional(),
  username: z.string()
    .min(3, "Username too short")
    .max(30, "Username too long")
    .toLowerCase()
    .refine(
      value => !/\s/.test(value), 
      { message: "Username cannot contain spaces" }
    ),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password needs 8+ characters"),
  campaigns: z.array(z.string()).default([]).optional(), // References to campaigns
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
}).strict(); // Prevents undeclared fields

// Schema for Partial Updates (PUT/PATCH)
export const UserUpdateSchema = UserSchema
  .omit({ id: true, createdAt: true }) // Removes immutable fields
  .partial()
  .required({ 
    updatedAt: true // Keeps updatedAt required
  });
```

---

## 2. Collection: `campaigns`
**Purpose**: Manage game campaigns.

```typescript
import { z } from 'zod';

export const CampaignSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(3, "Name too short").max(100, "Name too long"),
  synopsis: z.string().optional(),
  story: z.string().optional(),
  progress: z.string().optional(),
  advantages: z.array(z.string()).default([]).optional(),
  disadvantages: z.array(z.string()).default([]).optional(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
}).strict();

export const CampaignUpdateSchema = CampaignSchema
  .omit({ id: true, createdAt: true })
  .partial()
  .required({
    updatedAt: true
  });
```

---

## 3. Collection: `races`
**Purpose**: Define character races.

```typescript
import { z } from 'zod';

export const RaceSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(3, "Name too short").max(100, "Name too long"),
  history: z.string().optional(),
  advantages: z.array(z.string()).default([]).optional(),
  disadvantages: z.array(z.string()).default([]).optional(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
}).strict();

export const RaceUpdateSchema = RaceSchema
  .omit({ id: true, createdAt: true })
  .partial()
  .required({
    updatedAt: true
  });
```

---

## 4. Collection: `classes`
**Purpose**: Store character classes.

```typescript
import { z } from 'zod';

export const ClassSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(3, "Name too short").max(100, "Name too long"),
  description: z.string().optional(),
  advantages: z.array(z.string()).default([]).optional(),
  disadvantages: z.array(z.string()).default([]).optional(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
}).strict();

export const ClassUpdateSchema = ClassSchema
  .omit({ id: true, createdAt: true })
  .partial()
  .required({
    updatedAt: true
  });
```

---

## 5. Collection: `subclasses`
**Purpose**: Detail character subclasses.

```typescript
import { z } from 'zod';

export const SubclassSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(3, "Name too short").max(100, "Name too long"),
  description: z.string().optional(),
  advantages: z.array(z.string()).default([]).optional(),
  disadvantages: z.array(z.string()).default([]).optional(),
  classId: z.string().uuid(), // Reference to parent class
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
}).strict();

export const SubclassUpdateSchema = SubclassSchema
  .omit({ id: true, createdAt: true })
  .partial()
  .required({
    updatedAt: true
  });
```

---

## 6. Collection: `spells`
**Purpose**: Manage system spells.

```typescript
import { z } from 'zod';

export const SpellSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(3, "Name too short").max(100, "Name too long"),
  description: z.string().optional(),
  level: z.number().int().min(1, "Level must be at least 1"),
  unique: z.boolean().default(false),
  classIds: z.array(z.string().uuid()).default([]).optional(), // Allowed classes
  subclassIds: z.array(z.string().uuid()).default([]).optional(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
}).strict();

export const SpellUpdateSchema = SpellSchema
  .omit({ id: true, createdAt: true })
  .partial()
  .required({
    updatedAt: true
  });
```

---

## 7. Collection: `levels`
**Purpose**: Control character levels.

```typescript
import { z } from 'zod';

export const LevelSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(3, "Name too short").max(100, "Name too long"),
  attributePoints: z.number().int().min(0, "Attribute points cannot be negative"),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
}).strict();

export const LevelUpdateSchema = LevelSchema
  .omit({ id: true, createdAt: true })
  .partial()
  .required({
    updatedAt: true
  });
```

---

## 8. Collection: `characterSheets`
**Purpose**: Store character sheets.

```typescript
import { z } from 'zod';

export const CharacterSheetSchema = z.object({
  id: z.string().uuid().optional(),
  characterName: z.string().min(3, "Name too short").max(100, "Name too long"),
  campaignId: z.string().uuid(),
  raceId: z.string().uuid(),
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
}).strict();

export const CharacterSheetUpdateSchema = CharacterSheetSchema
  .omit({ id: true, createdAt: true })
  .partial()
  .required({
    updatedAt: true
  });
```

---

## Technical Considerations:
1. **Validation**  
   Uses `$jsonSchema` to ensure consistency.  
2. **Relationships**  
   Uses `ObjectId` for references between collections (e.g., `campaignId`).  
3. **Audit Fields**  
   `createdAt` and `updatedAt` added for tracking.  
4. **Flexibility**  
   Arrays like `advantages/disadvantages` allow customization.

> Based on MongoDB modeling best practices and JSON Schema validation.

### Notes:
- All 8 collections are listed individually.
- Each schema includes comments in English and type validation.
- Fields like `createdAt` and `updatedAt` are standardized for auditing.
- Relationships between collections are made via `ObjectId` (e.g., `classId` in `subclasses`).
