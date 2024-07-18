import * as PlayersStore from '../stores/PlayerStore';
import { Player } from '../types/Player';
import { generateCodeFromUniqueId } from "../utils/CodeGenerator";

export async function getPlayer(playerId: string, shouldRegister = false): Promise<Player | null> {
    const player = await PlayersStore.GetPlayerById(playerId);
    const playerInDb = await PlayersStore.GetPlayerById(playerId);

    if (!playerInDb && shouldRegister) {
        const friendCode = generateCodeFromUniqueId(playerId);
        PlayersStore.CreatePlayer({ id: playerId, friendCode, name: `Player_${friendCode.toLowerCase()}` });
        console.log("Player registered", playerId);
    }
    return player
}