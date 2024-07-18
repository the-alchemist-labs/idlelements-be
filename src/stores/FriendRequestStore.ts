import { FriendRequestModel } from "../models/FriendRequest";
import { FriendRequest } from "../types/FriendRequest";

export async function GetFriendRequestsByRecipient(playerId: string): Promise<FriendRequest[]> {
    return FriendRequestModel.find({ recipient: playerId }, { _id: 0, __v: 0 }).lean();
}

export async function CreateFriendRequest(request: FriendRequest) {
    return FriendRequestModel.create(request);
}

export async function DeleteFriendRequest({ sender, recipient }: FriendRequest): Promise<void> {
    await FriendRequestModel.deleteMany({ sender, recipient });
}

export async function IsFriendRequestExists(playerId1: string, playerId2: string): Promise<boolean> {
    const friendRequest = await FriendRequestModel.findOne({
        $or: [
            { sender: playerId1, recipient: playerId2 },
            { sender: playerId2, recipient: playerId1 }
        ]
    }, { _id: 0, __v: 0 }).lean();

    return !!friendRequest;
}