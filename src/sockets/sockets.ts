
import { Server, Socket } from 'socket.io';
import * as playerFlows from '../flows/players';
import { SocketEvent, SocketResponseEvent } from '../types/SocketEvents';
import { ClientManager } from './clients';
import { playerSocketConnectionSchema } from '../types/Player';

export let mySocket: Socket; 

export function initializeSockets(io: Server) {
  io.on(SocketEvent.Connection, async socket => {
    mySocket = socket;
    try {
      await registerPlayer(socket);

      socket.on(SocketEvent.Disconnect, () => {
        ClientManager.removeClient(socket.id);
      });

    } catch (err) {
      socket.emit(SocketResponseEvent.Error, { message: (err as Error).message });
      console.log("Socket event failed", (err as Error).message);
    }
  });
};

async function registerPlayer(socket: Socket): Promise<void> {
  const { playerId } = playerSocketConnectionSchema.parse(socket.handshake.query);

  ClientManager.addClient(playerId, socket.id);
  await playerFlows.registerPlayer(playerId);
}

