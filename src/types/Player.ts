import { z } from 'zod';

export const partySchema = z.object({
  First: z.number(),
  Second: z.number(),
  Third: z.number(),
  MaxSize: z.number(),
});

export type Party = z.infer<typeof partySchema>;

export const playerSchema = z.object({
  id: z.string(),
  friendCode: z.string(),
  name: z.string(),
  level: z.number(),
  elementalsCaught: z.number(),
  party: partySchema,
});

export type Player = z.infer<typeof playerSchema>;

export const playerSocketConnectionSchema = z.object({
  playerId: z.string(),
});