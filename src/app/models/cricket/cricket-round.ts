import {CricketHit} from './cricket-hit';

export class CricketRound {
  playerId: number;
  darts: CricketHit[];
  bib: boolean;
  moreDarts: boolean;

  constructor(playerId) {
    this.playerId = playerId;
    this.darts = [];
    this.bib = false;
    this.moreDarts = true;
  }
}
