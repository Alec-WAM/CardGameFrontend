import { CommonModule } from '@angular/common';
import { Component, input, model } from '@angular/core';
import { CARD_SVGS, CardID } from '../../api/CardType';

@Component({
  selector: 'app-card-component',
  imports: [
    CommonModule
  ],
  templateUrl: './card-component.html',
  styleUrl: './card-component.css'
})
export class CardComponent {
  cardId = input.required<CardID>();
  flipped = model(false);

  get cardSvg(): string {
    return CARD_SVGS[this.cardId()];
  }

  flipCard() {
    this.flipped.update((oldValue) => !oldValue);
  }
}
