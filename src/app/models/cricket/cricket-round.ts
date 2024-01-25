import {CricketHit} from './cricket-hit';

export class CricketRound {
  playerId: number;
  darts: CricketHit[];
  bib: number;
  moreDarts: boolean;

  constructor(playerId: number) {
    this.playerId = playerId;
    this.darts = [];
    this.bib = 0;
    this.moreDarts = true;
  }
}
