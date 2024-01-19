import {CricketRoundTeam} from './cricket-round-team';
import {CricketTeam} from './cricket-team';

export class CricketTeamGame {
  team: CricketTeam;
  rounds: CricketRoundTeam[];
  bibs: number;
  twenties: number;
  nineteens: number;
  eighteens: number;
  seventeens: number;
  sixteens: number;
  fifteens: number;
  bullseyes: number;
  twentyClosed: boolean;
  nineteenClosed: boolean;
  eighteenClosed: boolean;
  seventeenClosed: boolean;
  sixteenClosed: boolean;
  fifteenClosed: boolean;
  bullseyeClosed: boolean;
  isActive: boolean;
  isWinner: boolean;

  constructor(team: CricketTeam) {
    this.team = team;
    this.rounds = [];
    this.twenties = 0;
    this.nineteens = 0;
    this.eighteens = 0;
    this.seventeens = 0;
    this.sixteens = 0;
    this.fifteens = 0;
    this.bullseyes = 0;
    this.twentyClosed = false;
    this.nineteenClosed = false;
    this.eighteenClosed = false;
    this.seventeenClosed = false;
    this.sixteenClosed = false;
    this.fifteenClosed = false;
    this.bullseyeClosed = false;
    this.bibs = 0;
    this.isActive = false;
    this.isWinner = false;
  }

}

