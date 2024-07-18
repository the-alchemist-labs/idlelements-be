import { FriendshipModel } from "../models/Friendship";
import { Friendship } from "../types/Friendship";

export async function GetFriends(playerId: string): Promise<Friendship[]> {
    return FriendshipModel.find({ $or: [{ playerId1: playerId }, { playerId2: playerId }] }, { _id: 0, __v: 0 }).lean();
}

export async function CreateFriendRequest(friendship: Friendship) {
    return FriendshipModel.create(friendship);
}

export async function DeleteFriendship({ playerId1, playerId2 }: Friendship): Promise<void> {
    await FriendshipModel.deleteOne({ playerId1, playerId2 });
}

export async function IsFriendshipExists(playerId1: string, playerId2: string): Promise<boolean> {
    const friendship = await FriendshipModel.findOne({
        $or: [
            { playerId1: playerId1, playerId2: playerId2 },
            { playerId1: playerId2, playerId2: playerId1 }
        ]
    }, { _id: 0, __v: 0 }).lean();

    return !!friendship;
}
