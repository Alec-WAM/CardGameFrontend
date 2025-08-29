import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardID } from '../../../api/CardType';
import { GameService } from '../../../services/game-service';
import { CardComponent } from '../../card-component/card-component';
import { RoomSettingsComponent } from './room-settings-component/room-settings-component';

@Component({
  selector: 'app-room-component',
  imports: [
    AsyncPipe,
    RoomSettingsComponent,
    CardComponent
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

}
