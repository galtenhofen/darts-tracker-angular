import { CricketPlayer } from "../cricket/cricket-player";
import { CricketTeam } from "../cricket/cricket-team";

export interface CricketSettings {
    gameType: string;
    numPlayers: number;
    playerIdList: number[];
    teamIdList?: number[];
    numTeams?: number;
    inOrder: boolean;
    gameStarted: boolean;
  }

  export class CricketSettingsImpl implements CricketSettings {
    constructor(
      public gameType: string = 'individual',
      public numPlayers: number = 2,
      public playerIdList: number[]=[998,999],
      public teamIdList: number[]=[],
      public numTeams?: number,
      public inOrder: boolean = true,
      public gameStarted: boolean = false,
   
    ) {}

  }