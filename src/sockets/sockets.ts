
import { Server } from 'socket.io';
import { playerSchema } from "../types/Player";
import { registerPlayer } from '../flows/players';
import { SocketEvent, SocketResponseEvent } from '../types/SocketEvents';
import { sendFriendRequest } from '../flows/friends';
import { ClientManager } from './clients';

export const initializeSockets = (io: Server) => {
  io.on(SocketEvent.Connection, async socket => {
    try {
      const parsedPlayer = playerSchema.parse(socket.handshake.query);

      ClientManager.addClient(parsedPlayer.id, socket.id);
      await registerPlayer(parsedPlayer);

      socket.on(SocketEvent.FriendRequest, data => {
        sendFriendRequest(socket, data);
      });

      socket.on(SocketEvent.TradeRequest, _data => {
        // implement
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
