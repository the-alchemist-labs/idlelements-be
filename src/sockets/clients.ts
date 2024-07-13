import * as _ from 'lodash';

export class ClientManager {
    private static clients: { [key: string]: string } = {};

    static getClient(playerId: string): string | null {
        return this.clients[playerId] || null;
    }

    static addClient(playerId: string, socketId: string) {
        this.clients[playerId] = socketId;
    }

    static removeClient(socketId: string) {
        const keyToRemove = _.findKey(this.clients, value => value === socketId);
        if (keyToRemove) {
            _.unset(this.clients, keyToRemove);
        }
    }
}
