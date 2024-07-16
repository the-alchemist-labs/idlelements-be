import { PlayerModel } from "../models/Player";
import { Player } from "../types/Player";

export async function GetPlayerById(id: string): Promise<Player | null> {
    return PlayerModel.findOne({ id: id }).lean();
}

export async function GetPlayerByFriendCode(friendCode: string): Promise<Player | null> {
    return PlayerModel.findOne({ friendCode }).lean();
}

export async function CreatePlayer(player: Player) {
    return PlayerModel.create(player);
}