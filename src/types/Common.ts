export interface StatusResponse {
    status: Status;
    message?: string;
}

export enum Status {
    Success,
    Failed,
}