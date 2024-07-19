import { SocketResponseEvent } from "../types/SocketEvents";
import { FriendRequestRespond } from "../types/FriendRequest";
import { ClientManager } from "../sockets/clients";
import * as PlayersStore from '../stores/PlayerStore';
import * as FriendRequestStore from '../stores/FriendRequestStore';
import * as FriendshipStore from '../stores/FriendshipStore';
import { Status, StatusResponse } from "../types/Common";
import { Friendship } from "../types/Friendship";
import { io } from "..";
import { Player } from "../types/Player";
import { PlayerInfo } from "../types/PlayerInfo";

export async function getFriends(playerId: string): Promise<(PlayerInfo | null)[]> {
    try {
        const friendships = await FriendshipStore.GetFriends(playerId);
        const friendIds = friendships.map(fs => getFriendId(playerId, fs!));
        const friends = await Promise.all(friendIds.map(getPlayerInfo));

        emitPlayerOnline(playerId, friendIds, true);

        return friends;

    } catch (error) {
        console.error(`Failed to get friends for ${playerId}`);
        return [];
    }
}

export async function getPendingFriendRequests(recipient: string): Promise<(Player | null)[]> {
    try {
        const requests = await FriendRequestStore.GetFriendRequestsByRecipient(recipient);
        const players = await Promise.all(requests.map(r => getPlayerInfo(r.sender)));
        return players;
    } catch (error) {
        console.error(`Failed to get friends requests for ${recipient}`);
        return [];
    }
}

export async function sendFriendRequest(senderId: string, toFriendCode: string): Promise<StatusResponse> {
    try {
        const code = formatFriendCode(toFriendCode);
        const recipient = await PlayersStore.GetPlayerByFriendCode(code);

        if (!recipient) {
            console.log(`Friend ${toFriendCode} not found`);
            return { status: Status.Failed, message: "Player not found" };
        }

        const isFriendRequestExists = await FriendRequestStore.IsFriendRequestExists(senderId, recipient.id);

        if (isFriendRequestExists) {
            return { status: Status.Failed, message: "You sent a request already" };
        }

        const isFriendshipExistes = await FriendshipStore.IsFriendshipExists(senderId, recipient.id);

        if (isFriendshipExistes) {
            return { status: Status.Failed, message: "You are already friends" };
        }

        await FriendRequestStore.CreateFriendRequest({ sender: senderId, recipient: recipient.id });
        const recipientSocketId = ClientManager.getClient(recipient.id);

        const sender = await PlayersStore.GetPlayerById(senderId);

        if (recipientSocketId && sender) {
            io.to(recipientSocketId).emit(SocketResponseEvent.FriendRequestReceived, { from: sender });
        }


        console.log('Friend request succesfully sent');
        return { status: Status.Success };
    } catch (error) {
        console.error('Failed to send friend request', error);
        return { status: Status.Failed, message: (error as Error).message };
    }
}

export async function handleFriendRequestRespond(fromPlayerId: string, requestFromPlayerId: string, respond: FriendRequestRespond): Promise<StatusResponse> {
    try {
        if (respond == FriendRequestRespond.Accept) {
            await FriendshipStore.CreateFriendRequest({ playerId1: fromPlayerId, playerId2: requestFromPlayerId });

            const recipientSocketId = ClientManager.getClient(requestFromPlayerId);
            if (respond == FriendRequestRespond.Accept && recipientSocketId) {
                io.to(recipientSocketId).emit(SocketResponseEvent.FriendRequestAccepted, { fromPlayerId });
            }
        }

        await FriendRequestStore.DeleteFriendRequest({ sender: requestFromPlayerId, recipient: fromPlayerId });

        console.log("Friend request handled succesfuly", JSON.stringify({ fromPlayerId, requestFromPlayerId, respond }));

        return { status: Status.Success };
    } catch (error) {
        console.error('Failed to get handle friend request responsd', JSON.stringify({ fromPlayerId, requestFromPlayerId, respond }));

        return { status: Status.Failed, message: (error as Error).message }
    }
}


export async function emitPlayerOffline(playerId: string) {
    const friends = await getFriends(playerId);
    const friendIds = friends.filter(Boolean).map(f => f!.id);
    emitPlayerOnline(playerId, friendIds, false);
}

function getFriendId(playerId: string, friendish: Friendship): string {
    const friendId = playerId === friendish.playerId1 ? friendish.playerId2 : friendish.playerId1;
    return friendId;
}

async function getPlayerInfo(playerId: string): Promise<PlayerInfo | null> {
    const player = await PlayersStore.GetPlayerById(playerId);

    if (!player) {
        return null;
    }

    const isOnline = !!ClientManager.getClient(playerId);

    return { ...player, isOnline };
}

function formatFriendCode(code: string) {
    if (code.startsWith('#')) {
        code = code.slice(1);
    }
    return code.toUpperCase();
}

function emitPlayerOnline(playerId: string, friends: string[], isOnline: boolean) {
    for (const friend of friends) {
        const friendSocketId = ClientManager.getClient(friend);

        if (friendSocketId) {
            io.to(friendSocketId).emit(SocketResponseEvent.FriendOnlineStatus, { playerId, isOnline });
        }
    }
}