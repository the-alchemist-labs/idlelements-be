export enum SocketEvent {
    Connection = "connection",
    Disconnect = "disconnect",
}

export enum SocketResponseEvent {
    FriendRequest = "friend_request_response",
    FriendRequestNotification = 'friend_request_notification',
    Error = 'socket_error',
}