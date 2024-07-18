
import { Server, Socket } from 'socket.io';
import { SocketEvent, SocketResponseEvent } from '../types/SocketEvents';
import { ClientManager } from './clients';
import { playerSocketConnectionSchema } from '../types/Player';


export function initializeSockets(io: Server) {
  io.on(SocketEvent.Connection, async socket => {
    try {
      const { playerId } = playerSocketConnectionSchema.parse(socket.handshake.query);
      ClientManager.addClient(playerId, socket.id);

      socket.on(SocketEvent.Disconnect, () => {
        ClientManager.removeClient(socket.id);
      });

    } catch (err) {
      socket.emit(SocketResponseEvent.Error, { message: (err as Error).message });
      console.log("Socket event failed", (err as Error).message);
    }
  });
};
