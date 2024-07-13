export enum SocketEvent {
    Connection = "connection",
    Disconnect = "disconnect",
    FriendRequest = 'friend_request',
    TradeRequest = "trade_request",
}

export enum SocketResponseEvent {
    FriendRequest = "friend_request_response",
    FriendRequestNotification = 'friend_request_notification',
    Error = 'socket_error',
}