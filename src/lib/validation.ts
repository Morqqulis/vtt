import { z } from 'zod';

export const NewsPromptSchema = z.object({
  id: z.string(),
  category: z.string(),
  content: z.string(),
  isActive: z.boolean(),
  lastModified: z.date()
});

export const StationSchema = z.object({
  // ... existing validation ...
  newsPrompts: z.array(NewsPromptSchema).optional(),
}); 