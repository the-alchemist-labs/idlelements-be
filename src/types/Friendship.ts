import { z } from 'zod';

export const friendshipSchema = z.object({
  playerId1: z.string(),
  playerId2: z.string(),
  createdAt: z.date().optional(),
});

export type Friendship = z.infer<typeof friendshipSchema>;
