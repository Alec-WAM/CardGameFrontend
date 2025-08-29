import { RoomInfo } from "./RoomInfo";

export interface CreateRoomResponse {
    roomCode: string;
    room: RoomInfo;
}

export interface JoinRoomResponse {
    success: boolean;
    room?: RoomInfo;
    message?: string;
}