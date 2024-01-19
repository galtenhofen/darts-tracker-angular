import { CricketPlayer } from './cricket-player';

export class CricketTeam {
  teamId: number;
  teamName: string;
  playerOne: CricketPlayer;
  playerTwo: CricketPlayer;
  retribution: boolean;

  constructor(teamId: number, teamName: string, player1: CricketPlayer, player2: CricketPlayer, retribution: boolean){
    this.teamId = teamId;
    this.teamName = teamName;
    this.playerOne = player1;
    this.playerTwo = player2;
    this.retribution = retribution;
  }
}

