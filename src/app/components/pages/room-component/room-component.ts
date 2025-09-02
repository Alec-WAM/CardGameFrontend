import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardID } from '../../../api/CardType';
import { GameService } from '../../../services/game-service';
import { PlayerHandComponent } from './player-hand-component/player-hand-component';
import { RoomSettingsComponent } from './room-settings-component/room-settings-component';

const raiseBy = -15; // negative because Y axis grows down
export const SEAT_OFFSETS = [
  { x: 0, y: 40 + raiseBy },
  { x: -15, y: 30 + raiseBy },
  { x: 15, y: 30 + raiseBy },
  { x: -30, y: 20 + raiseBy },
  { x: 30, y: 20 + raiseBy },
  { x: -45, y: 10 + raiseBy },
  { x: 45, y: 10 + raiseBy },
];

@Component({
  selector: 'app-room-component',
  imports: [
    AsyncPipe,
    RoomSettingsComponent,
    ButtonModule,
    PlayerHandComponent,
    CommonModule
  ],
  templateUrl: './room-component.html',
  styleUrl: './room-component.css'
})
export class RoomComponent {
  readonly gameService = inject(GameService);
  readonly route = inject(ActivatedRoute);

  seatPositions: Record<string, any> = {};

  CardID = CardID;
  
  roomCode!: string;

  constructor() {
    this.route.params.subscribe(params => this.roomCode = params['roomCode']);

    this.gameService.playerSeats$.subscribe((seats) => {
      this.seatPositions = this.assignSeats(seats);
    })
  }

  public startGame(): void {
    this.gameService.startGame(this.roomCode)
    .catch((err) => console.error(err));
  }

  public hit(): void {
    this.gameService.blackjackHit(this.roomCode)
    .catch((err) => console.error(err));
  }

  public stand(): void {
    this.gameService.blackjackStand(this.roomCode)
    .catch((err) => console.error(err));
  }

  public canHit(): boolean {
    return this.gameService.isUserCurrentPlayer();
  }

  public canStand(): boolean {
    return this.gameService.isUserCurrentPlayer();
  }

  assignSeats(playerSeats: Record<string, number>): Record<string, any> {
    const seats: Record<string, any> = {};

    Object.keys(playerSeats).forEach((playerId) => {
      seats[playerId] = SEAT_OFFSETS[playerSeats[playerId]];
    })

    return seats;
  }

}
