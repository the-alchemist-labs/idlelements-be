import { Player } from "../types/Player";
import * as PlayersStore from '../stores/PlayerStore';

export async function registerPlayer(player: Player) {
    const playerInDb = await PlayersStore.GetPlayer(player.id);
    if (!playerInDb) {
        PlayersStore.CreatePlayer(player);
        console.log("Player registered", player.id);
    }
}