import { defineCollection, z } from 'astro:content';

const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    updated: z.coerce.date(),
    order: z.number().default(0),
  }),
});

export const collections = { notes };
