import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../../../services/game-service';
import { RoomSettingsComponent } from './room-settings-component/room-settings-component';

@Component({
  selector: 'app-room-component',
  imports: [
    AsyncPipe,
    RoomSettingsComponent
  ],
  templateUrl: './room-component.html',
  styleUrl: './room-component.css'
})
export class RoomComponent {
  readonly gameService = inject(GameService);
  readonly route = inject(ActivatedRoute);
  
  roomCode!: string;

  constructor() {
    this.route.params.subscribe(params => this.roomCode = params['roomCode']);
  }

}
