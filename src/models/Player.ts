import mongoose, { Schema } from 'mongoose';
import { Player, Party } from '../types/Player';

const PartySchema: Schema<Party> = new Schema({
  First: { type: Number, default: 0 },
  Second: { type: Number, default: 0 },
  Third: { type: Number, default: 0 },
  MaxSize: { type: Number, required: true },
});

const PlayerSchema: Schema<Player> = new Schema({
  id: { type: String, required: true, unique: true },
  friendCode: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  level: { type: Number, required: true },
  elementalsCaught: { type: Number, required: true },
  party: { type: PartySchema, required: true },
});

export const PlayerModel = mongoose.model<Player>('Player', PlayerSchema);