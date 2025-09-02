import { CardID } from "./CardType";

export interface GameState {
    dealerHand: GameCard[];
    dealerStatus: PlayerStatus;
    hands: Record<string, GameCard[]>;
    playerStatus: Record<string, PlayerStatus>;
    currentPlayer: string;
    gameStarted: boolean;
}

export interface GameCard {
    cardId: CardID;
    flipped: boolean;
}

export interface PlayerStatus {
    state: string;
    points: number;
}