import { CricketPlayer } from './cricket-player';

export class CricketTeam {
  teamId: number;
  teamName: string;
  playerOne: CricketPlayer;
  playerTwo: CricketPlayer;
  retribution: boolean;

  constructor(teamId, teamName, player1, player2, retribution){
    this.teamId = teamId;
    this.teamName = teamName;
    this.playerOne = player1;
    this.playerTwo = player2;
    this.retribution = retribution;
  }
}

