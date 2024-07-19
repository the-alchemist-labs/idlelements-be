import { z } from 'zod';
import { playerSchema } from './Player';


export const playerInfoSchema = playerSchema.extend({
  isOnline: z.boolean(),
});

export type PlayerInfo = z.infer<typeof playerInfoSchema>;

export const playerSocketConnectionSchema = z.object({
  playerId: z.string(),
});