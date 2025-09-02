export interface RoomInfo {
    password: string;
    players: PlayerInfo[];
    hostId: string;
}

export interface PlayerInfo {
    id: string;
    name: string;
}