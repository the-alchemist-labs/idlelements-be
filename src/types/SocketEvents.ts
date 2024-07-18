export enum SocketEvent {
    Connection = "connection",
    Disconnect = "disconnect",
}

export enum SocketResponseEvent {
    FriendRequestReceived = 'friend_request_received',
    FriendRequestAccepted = 'friend_request_accepted',
    Error = 'socket_error',
}