import { GameState } from "./GameStatus";
import { RoomInfo } from "./RoomInfo";

export interface CreateRoomResponse {
    roomCode: string;
    room: RoomInfo;
}

export interface JoinRoomResponse extends BasicResponse {
    room?: RoomInfo;
    currentGame?: GameState;
}

export interface StartGameResponse extends BasicResponse {
    game?: GameState;
}

export interface BasicResponse {
    success: boolean;
    message?: string;
}