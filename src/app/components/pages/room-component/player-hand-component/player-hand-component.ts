import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { GameCard } from '../../../../api/GameStatus';
import { PlayerInfo } from '../../../../api/RoomInfo';
import { GameService } from '../../../../services/game-service';
import { CardComponent } from '../../../card-component/card-component';

@Component({
  selector: 'app-player-hand-component',
  imports: [
    AsyncPipe,
    CardComponent,
    CommonModule
  ],
  templateUrl: './player-hand-component.html',
  styleUrl: './player-hand-component.css'
})
export class PlayerHandComponent {
  readonly gameService = inject(GameService);

  playerInfo = input<PlayerInfo | undefined>(undefined);
  playerInfo$ = toObservable(this.playerInfo);

  isDealer = input<boolean>(false);
  isDealer$ = toObservable(this.isDealer);

  playerHand = signal<GameCard[]>([]);
  playerHand$ = toObservable(this.playerHand);

  constructor() { 
    this.gameService.gameState$.subscribe((gameState) => {
      console.log("Updating Player Hand:", this.playerInfo(), gameState); 
      if(gameState != null) {
        if(this.playerInfo()){
          this.playerHand.set(this.gameService.getPlayerHand(this.playerInfo()!.id) ?? []);
        }
        else if(this.isDealer()) {
          this.playerHand.set(gameState.dealerHand);
        }
        else {
          this.playerHand.set([]);
        }
      }
      else {
        this.playerHand.set([]);
      }
    });
    this.playerInfo$.subscribe((playerInfo) => {
      if(playerInfo) {
        this.playerHand.set(this.gameService.getPlayerHand(playerInfo.id) ?? []);
      }
    });
    this.isDealer$.subscribe((isDealer) => {
      if(isDealer) {
        this.playerHand.set(this.gameService.gameState()?.dealerHand ?? []);
      }
    });
  }

}
