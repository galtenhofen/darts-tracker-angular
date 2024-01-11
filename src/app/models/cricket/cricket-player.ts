export class CricketPlayer {
  playerId: number;
  firstName: string;
  lastName: string;
  teamId?: string;
  bibs: number;
  wins: number;
  losses: number;

  constructor(firstName: string, lastName: string, playerId: number, team?: string | undefined) {
    this.playerId = playerId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.teamId = team;
    this.bibs = 0;
    this.wins = 0;
    this.losses = 0;
  }



}
