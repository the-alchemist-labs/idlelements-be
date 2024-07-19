import * as PlayersStore from '../stores/PlayerStore';
import { Status } from '../types/Common';
import { Player } from '../types/Player';
import { generateCodeFromUniqueId } from "../utils/CodeGenerator";

export async function getPlayer(playerId: string, shouldRegister = false): Promise<Player | null> {
    const player = await PlayersStore.GetPlayerById(playerId);
    const playerInDb = await PlayersStore.GetPlayerById(playerId);

    if (!playerInDb && shouldRegister) {
        const friendCode = generateCodeFromUniqueId(playerId);
        PlayersStore.CreatePlayer({
            id: playerId,
            friendCode,
            name: `Player_${friendCode.toLowerCase()}`,
            level: 1,
            elementalsCaught: 0,
            party: { First: 0, Second: 0, Third: 0, MaxSize: 3 },
        });
        console.log("Player registered", playerId);
    }
    return player
}

export async function updatePlayer(player: Player): Promise<Status> {
    await PlayersStore.UpdaterPlayer(player);
    return Status.Success
}
