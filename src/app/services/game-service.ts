import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { io, Socket } from 'socket.io-client';
import { GameCard, GameState } from '../api/GameStatus';
import { PlayerInfo, RoomInfo } from '../api/RoomInfo';
import { BasicResponse, CreateRoomResponse, JoinRoomResponse, StartGameResponse } from '../api/ServerResponses';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private socket: Socket;
  public currentRoom: WritableSignal<RoomInfo | undefined> = signal(undefined);
  public currentRoom$ = toObservable(this.currentRoom);

  public gameState: WritableSignal<GameState | undefined> = signal(undefined);
  public gameState$ = toObservable(this.gameState);

  public isRoomHost = computed(() => 
    this.currentRoom() !=null && this.currentRoom()!.hostId === this.socket?.id
  );
  
  constructor() {
    this.socket = io('http://localhost:3000');

    this.socket.on('roomUpdate', (room: RoomInfo) => {
      this.currentRoom.set(room);
    });

    this.socket.on('gameState', (gameState: GameState) => {
      console.log("Received game state:", gameState);
      this.gameState.set(gameState);
    });
  }

  createRoom(password?: string, playerName?: string): Promise<string> {
    return new Promise((resolve) => {
      this.socket.emit('createRoom', { password: password, playerName: playerName }, (res: CreateRoomResponse) => {
        console.log("Room created:", res);
        this.currentRoom.set(res.room);
        this.gameState.set(undefined);
        resolve(res.roomCode);
      });
    });
  }

  joinRoom(roomCode: string, password?: string, playerName?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.socket.emit('joinRoom', { roomCode: roomCode, password: password, playerName: playerName }, (res: JoinRoomResponse) => {
        if(res.success) {
          console.log("Joined room:", res.room);
          this.currentRoom.set(res.room);
          this.gameState.set(res.currentGame);
          resolve(res);
        }
        else {
          console.log("Failed to join room:", res.message);
          this.currentRoom.set(undefined);
          reject(res);
        }
      });
    });
  }

  startGame(roomCode: string) {
    return new Promise((resolve, reject) => {
      this.socket.emit('startGame', { roomCode: roomCode }, (res: StartGameResponse) => {
        if(res.success) {
          console.log("Started Game:", res.game);
          this.gameState.set(res.game);
          resolve(res);
        }
        else {
          console.log("Failed to start game:", res.message);
          this.gameState.set(undefined);
          reject(res);
        }
      });
    });
  }

  blackjackHit(roomCode: string) : Promise<any> {
    return new Promise((resolve, reject) => {
      this.socket.emit('blackjack.hit', { roomCode: roomCode }, (res: BasicResponse) => {
        if(res.success) {
          resolve(res);
        }
        else {
          console.log("Failed to hit blackjack card:", res.message);
          reject(res);
        }
      });
    });
  }

  blackjackStand(roomCode: string) : Promise<any> {
    return new Promise((resolve, reject) => {
      this.socket.emit('blackjack.stand', { roomCode: roomCode }, (res: BasicResponse) => {
        if(res.success) {
          resolve(res);
        }
        else {
          console.log("Failed to stand blackjack card:", res.message);
          reject(res);
        }
      });
    });
  }

  getUserId(): string | undefined {
    return this.socket.id;
  }

  getCurrentActivePlayer(): string | undefined {
    return this.gameState()?.currentPlayer;
  }

  isUserCurrentPlayer(): boolean {
    return this.getCurrentActivePlayer() === this.getUserId();
  }

  getPlayers(): PlayerInfo[] {
    return this.currentRoom()?.players ?? [];
  }

  getPlayerHand(playerId: string): GameCard[] | undefined {
    return this.gameState()?.hands[playerId];
  }
}
