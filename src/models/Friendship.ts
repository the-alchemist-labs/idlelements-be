import mongoose, { Schema } from 'mongoose';
import { Friendship } from '../types/Friendship';

const FriendshipSchema: Schema<Friendship> = new Schema({
  playerId1: { type: String, required: true },
  playerId2: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

FriendshipSchema.index({ playerId1: 1, playerId2: 1 }, { unique: true });

export const FriendshipModel = mongoose.model<Friendship>('Friend', FriendshipSchema);