export class CricketPlayer {
  playerId: number;
  firstName: string;
  lastName?: string;
  teamId?: number;
  bibs: number;

  constructor(playerId: number,firstName: string, lastName?: string, team?: number) {
    this.playerId = playerId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.teamId = team;
    this.bibs = 0;
  }



}
