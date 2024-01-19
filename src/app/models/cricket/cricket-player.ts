export class CricketPlayer {
  playerId: number;
  firstName: string;
  lastName: string;
  teamId?: number;
  bibs: number;

  constructor(firstName: string, lastName: string, playerId: number, team?: number) {
    this.playerId = playerId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.teamId = team;
    this.bibs = 0;
  }



}
