import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { io, Socket } from 'socket.io-client';
import { RoomInfo } from '../api/RoomInfo';
import { CreateRoomResponse, JoinRoomResponse } from '../api/ServerResponses';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private socket: Socket;
  public currentRoom: WritableSignal<RoomInfo | undefined> = signal(undefined);
  public currentRoom$ = toObservable(this.currentRoom);

  public isRoomHost = computed(() => 
    this.currentRoom() !=null && this.currentRoom()!.hostId === this.socket?.id
  );
  
  constructor() {
    this.socket = io('http://localhost:3000');

    this.socket.on('roomUpdate', (room: RoomInfo) => {
      this.currentRoom.set(room);
    });
  }

  createRoom(password?: string): Promise<string> {
    return new Promise((resolve) => {
      this.socket.emit('createRoom', { password }, (res: CreateRoomResponse) => {
        console.log("Room created:", res);
        this.currentRoom.set(res.room);
        resolve(res.roomCode);
      });
    });
  }

  joinRoom(roomCode: string, password?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.socket.emit('joinRoom', { roomCode: roomCode, password: password }, (res: JoinRoomResponse) => {
        if(res.success) {
          console.log("Joined room:", res.room);
          this.currentRoom.set(res.room);
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
}
