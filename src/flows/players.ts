import * as PlayersStore from '../stores/PlayerStore';
import { generateCodeFromUniqueId } from "../utils/CodeGenerator";

export async function registerPlayer(playerId: string) {
    const playerInDb = await PlayersStore.GetPlayerById(playerId);

    if (!playerInDb) {
        const friendCode = generateCodeFromUniqueId(playerId);
        PlayersStore.CreatePlayer({ id: playerId, friendCode });
        console.log("Player registered", playerId);
    }
}

export async function getFriendCode(playerId: string): Promise<string | undefined> {
    const player = await PlayersStore.GetPlayerById(playerId);
    return player?.friendCode
}