import mongoose, { Schema } from 'mongoose';
import { FriendRequest } from '../types/FriendRequest';

const FriendRequestSchema: Schema<FriendRequest> = new Schema({
  sender: { type: String, required: true, unique: true },
  recipient: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

export const FriendRequestModel = mongoose.model<FriendRequest>('FriendRequest', FriendRequestSchema);