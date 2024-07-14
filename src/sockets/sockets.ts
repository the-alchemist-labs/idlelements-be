
import { Server, Socket } from 'socket.io';
import { playerSchema } from "../types/Player";
import * as playerFlows from '../flows/players';
import { SocketEvent, SocketResponseEvent } from '../types/SocketEvents';
import { sendFriendRequest } from '../flows/friends';
import { ClientManager } from './clients';

export const initializeSockets = (io: Server) => {
  io.on(SocketEvent.Connection, async socket => {
    try {
      await registerPlayer(socket);

      socket.on(SocketEvent.FriendRequest, data => {
        sendFriendRequest(socket, data);
      });

      socket.on('disconnect', () => {
        ClientManager.removeClient(socket.id);
      });

    } catch (err) {
      socket.emit(SocketResponseEvent.Error, { message: (err as Error).message });
      console.log("Socket event failed", (err as Error).message);
    }
  });
};

async function registerPlayer(socket: Socket) {
  const parsedPlayer = playerSchema.parse(socket.handshake.query);

  ClientManager.addClient(parsedPlayer.id, socket.id);
  await playerFlows.registerPlayer(parsedPlayer);

  console.log("Player registered", parsedPlayer.id);
}

