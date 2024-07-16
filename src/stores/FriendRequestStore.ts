import { FriendRequestModel } from "../models/FriendRequest";
import { FriendRequest } from "../types/FriendRequest";

export async function GetFriendRequestsByRecipient(playerId: string): Promise<FriendRequest[]> {
    return FriendRequestModel.find({ recipient: playerId }).lean();
}

export async function CreateFriendRequest(request: FriendRequest) {
    return FriendRequestModel.create(request);
}

export async function DeleteFriendRequest({ sender, recipient }: FriendRequest): Promise<void> {
    await FriendRequestModel.deleteMany({ sender, recipient });
}

export async function isFriendRequestExists(sender: string, recipient: string): Promise<boolean> {
    const friendRequest = FriendRequestModel.find({ recipient, sender });
    return !!friendRequest;
}