import { Socket } from "socket.io";

import { SocketResponseEvent } from "../types/SocketEvents";
import { FriendRequest } from "../types/FriendRequest";
import { ClientManager } from "../sockets/clients";
import * as PlayersStore from '../stores/PlayerStore';
import * as FriendRequestStore from '../stores/FriendRequestStore';

export async function sendFriendRequest(socket: Socket, { from, to }: { from: string, to: string }) {
    try {
        const recipient = await PlayersStore.GetPlayer(to);

        if (!recipient) {
            socket.emit(SocketResponseEvent.FriendRequest, { message: `${to} not found` });
            console.log(`Friend ${to} not found`);
            return;
        }

        FriendRequestStore.CreateFriendRequest({ sender: from, recipient: recipient.id })

        const recipientSocketId = ClientManager.getClient(recipient.id);

        if (recipientSocketId) {
            socket.to(recipientSocketId).emit(SocketResponseEvent.FriendRequestNotification, { from });
        }

        socket.emit(SocketResponseEvent.FriendRequest, { message: `Friend request sent from to ${to}` });

        console.log('Friend request succesfully sent');
    } catch {
        socket.emit(SocketResponseEvent.FriendRequest, { message: 'Failed to send friend request' });
        console.error('Failed to send friend request');
    }
}

export async function getFriendRequests(recipient: string): Promise<FriendRequest[]> {
    return FriendRequestStore.GetFriendRequestsByRecipient(recipient);
}