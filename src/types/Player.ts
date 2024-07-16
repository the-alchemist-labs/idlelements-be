import { z } from 'zod';

export const playerSchema = z.object({
  id: z.string(),
  friendCode: z.string(),
});

export type Player = z.infer<typeof playerSchema>;

export const playerSocketConnectionSchema = z.object({
  playerId: z.string(),
});