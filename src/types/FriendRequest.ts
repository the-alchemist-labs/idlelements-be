import { z } from 'zod';

export const friendRequestSchema = z.object({
  sender: z.string(),
  recipient: z.string(),
  createdAt: z.date().optional(),
});

export type FriendRequest = z.infer<typeof friendRequestSchema>;

export enum FriendRequestRespond {
  Accept,
  Reject,
}