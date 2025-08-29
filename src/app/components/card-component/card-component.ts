import { Component, Input } from '@angular/core';
import { CARD_SVGS, CardID } from '../../api/CardType';

@Component({
  selector: 'app-card-component',
  imports: [],
  templateUrl: './card-component.html',
  styleUrl: './card-component.css'
})
export class CardComponent {
  @Input() cardId!: CardID;
  flipped = false;

  get cardSvg(): string {
    return CARD_SVGS[this.cardId];
  }

  flipCard() {
    this.flipped = !this.flipped;
  }
}
