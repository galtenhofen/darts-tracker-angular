import {CricketHit} from './cricket-hit';

export class CricketRoundTeam {
  playerId: number;
  teamId: number;
  darts: CricketHit[];
  bib: boolean;
  moreDarts: boolean;

  constructor(playerId: number , teamId: number) {
    this.playerId = playerId;
    this.teamId = teamId;
    this.darts = [];
    this.bib = false;
    this.moreDarts = true;
  }
}
