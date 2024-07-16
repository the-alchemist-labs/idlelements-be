import mongoose, { Schema } from 'mongoose';
import { Player } from '../types/Player';

const PlayerSchema: Schema<Player> = new Schema({
  id: { type: String, required: true, unique: true },
  friendCode: { type: String, required: true, unique: true },
});

export const PlayerModel = mongoose.model<Player>('Player', PlayerSchema);