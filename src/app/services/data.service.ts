import { Injectable } from '@angular/core';
import { CricketSettings, CricketSettingsImpl } from '../models/settings/cricket-settings.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  currentGame: string = '';
currentCricketSettings: CricketSettings | undefined;
defaultCricketSettings: CricketSettings = new CricketSettingsImpl('individual',2,[996,997],[],0,true,false);

  constructor() { }

  public setCricketOptions(gameType: string, 
    numPlayers: number,
    playerIdList: number[],
    inOrder: boolean,
    gameStarted: boolean,
    teamIdList?: number[],
    numTeams?: number,
    ){
      console.log('setCricketOptions');
    this.currentCricketSettings = new CricketSettingsImpl(gameType,numPlayers,playerIdList,teamIdList,numTeams,inOrder,gameStarted)
      return true; 
  }

  public getCurrentCricketOptions():Observable<CricketSettings>{
    return of(this.currentCricketSettings ?? this.defaultCricketSettings);
  }

  public getDefaultCricketOptions(){
    return this.defaultCricketSettings;
  }

  public setGame(gameName: string){
    this.currentGame = gameName;
  }

  public getGame(){
    return this.currentGame;
  }
  // public getPlayers(): Array<{playerId: any, teamId: any, firstName: any, lastName: any, email: any}> {
  //   return this.players;
  // }
  // public getPlayerNamesByIds(playerIds: string | string[]): Array<{playerId: any, teamId: any, firstName: any, lastName: any, email: any}> {
  //   const result = this.players.filter(function(e) {
  //     console.log('e.playerId', e.playerId - 1);
  //     return playerIds.indexOf((e.playerId - 1).toString()) >= 0;
  //   });
  //   return result;
  // }
  // public getTeams(): Array<{teamId: any, teamName: any, playerId1: any, playerId2: any}> {
  //   return this.teams;
  // }
  // public addPlayer(player: {playerId: any, teamId: any, firstName: any, lastName: any, email: any}) {
  //   this.players.push(player);
  // }
  //getPlayerById(playId){return player}
  //getTeamById(teamId){return team}
  //getPlayersByTeamId(teamId){return players}
}
