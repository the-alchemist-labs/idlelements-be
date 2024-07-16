import { SocketResponseEvent } from "../types/SocketEvents";
import { FriendRequest } from "../types/FriendRequest";
import { ClientManager } from "../sockets/clients";
import * as PlayersStore from '../stores/PlayerStore';
import * as FriendRequestStore from '../stores/FriendRequestStore';
import { mySocket } from "../sockets/sockets";
import { Status } from "../types/Common";

export async function sendFriendRequest(senderId: string, toFriendCode: string): Promise<Status> {
    try {
        const code = formatFriendCode(toFriendCode);
        const recipient = await PlayersStore.GetPlayerByFriendCode(code);

        if (!recipient) {
            mySocket.emit(SocketResponseEvent.FriendRequest, { message: `${code} not found` });
            console.log(`Friend ${toFriendCode} not found`);
            return Status.Failed;
        }

        const isFriendRequestExists = await FriendRequestStore.isFriendRequestExists(senderId, recipient.id);
        if (!isFriendRequestExists) {
            await FriendRequestStore.CreateFriendRequest({ sender: senderId, recipient: recipient.id });
            const recipientSocketId = ClientManager.getClient(recipient.id);

            if (recipientSocketId) {
                mySocket.to(recipientSocketId).emit(SocketResponseEvent.FriendRequestNotification, { fromPlayerId: senderId });
            }
        }

        console.log('Friend request succesfully sent');
        return Status.Success;
    } catch {
        mySocket.emit(SocketResponseEvent.FriendRequest, { message: 'Failed to send friend request' });
        console.error('Failed to send friend request');
        return Status.Failed;
    }
}

export async function getFriendRequests(recipient: string): Promise<FriendRequest[]> {
    return FriendRequestStore.GetFriendRequestsByRecipient(recipient);
}


function formatFriendCode(code: string) {
    if (code.startsWith('#')) {
        code = code.slice(1);
    }
    return code.toUpperCase();
}