import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { GameService } from '../../../services/game-service';

@Component({
  selector: 'app-home-component',
  imports: [
    ButtonModule,
    InputTextModule,
    DividerModule,
    IftaLabelModule,
    FormsModule
  ],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css'
})
export class HomeComponent {

  readonly gameService = inject(GameService);
  readonly router = inject(Router);

  createRoomPassword: string | undefined;

  joinRoomCode: string | undefined;
  joinRoomPassword: string | undefined;

  public createRoom(): void {
    if(this.createRoomPassword) {      
      this.gameService.createRoom(this.createRoomPassword)
      .then((roomCode) => this.router.navigate(['room', roomCode]))
      .catch((err) => console.error(err));
    }
  }

  public joinRoom(): void {
    if(this.joinRoomCode && this.joinRoomPassword) {
      this.gameService.joinRoom(this.joinRoomCode, this.joinRoomPassword)
      .then(() => this.router.navigate(['room', this.joinRoomCode]))
      .catch((err) => console.error(err));
    }
  }

}
