import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardID } from '../../../api/CardType';
import { GameService } from '../../../services/game-service';
import { PlayerHandComponent } from './player-hand-component/player-hand-component';
import { RoomSettingsComponent } from './room-settings-component/room-settings-component';

@Component({
  selector: 'app-room-component',
  imports: [
    AsyncPipe,
    RoomSettingsComponent,
    ButtonModule,
    PlayerHandComponent
  ],
  templateUrl: './room-component.html',
  styleUrl: './room-component.css'
})
export class RoomComponent {
  readonly gameService = inject(GameService);
  readonly route = inject(ActivatedRoute);

  CardID = CardID;
  
  roomCode!: string;

  constructor() {
    this.route.params.subscribe(params => this.roomCode = params['roomCode']);
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

}
