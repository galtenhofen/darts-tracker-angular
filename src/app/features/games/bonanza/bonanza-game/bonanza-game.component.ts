import {Component, OnInit, Input, Output, ViewChild, EventEmitter, HostListener} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import { BonanzaPlayer} from "@models/bonanza-player";
import {BonanzaRound} from "@models/bonanza-round";
import {BonanzaStartComponent} from "@core/components/bonanza/bonanza-start/bonanza-start.component";
import {BonanzaLeaderboardComponent} from "@core/components/bonanza/bonanza-leaderboard/bonanza-leaderboard.component";
import {BonanzaHistoryComponent} from "@core/components/bonanza/bonanza-history/bonanza-history.component";
import{BonanzaCurrentComponent} from "@core/components/bonanza/bonanza-current/bonanza-current.component";
import {BonanzaService} from "@core/services/bonanza.service";

@Component({
    templateUrl: './bonanza-game.component.html',
    styleUrls: ['./bonanza-game.component.scss']
})
export class BonanzaGameComponent implements OnInit{

  @ViewChild('bonanzaStarted') bonanzaStarted: boolean;

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if(event.key == "65"){this.onButtonPress(1)}
    else if(event.key == "66" ){this.onButtonPress(2)}
    else if(event.key == "67" ){this.onButtonPress(3)}
    else if(event.key == "68" ){this.onButtonPress(4)}
    else if(event.key == "69" ){this.onButtonPress(5)}
    else if(event.key == "70" ){this.onButtonPress(6)}
    else if(event.key == "71" ){this.onButtonPress(7)}
    else if(event.key == "72" ){this.onButtonPress(8)}
    else if(event.key == "73" ){this.onButtonPress(9)}
    else if(event.key == "74" ){this.onButtonPress(10)}
    else if(event.key == "75" ){this.onButtonPress(11)}
    else if(event.key == "76" ){this.onButtonPress(12)}
    else if(event.key == "77" ){this.onButtonPress(13)}
    else if(event.key == "78" ){this.onButtonPress(14)}
    else if(event.key == "79" ){this.onButtonPress(15)}
    else if(event.key == "80" ){this.onButtonPress(16)}
    else if(event.key == "81" ){this.onButtonPress(17)}
    else if(event.key == "82" ){this.onButtonPress(18)}
    else if(event.key == "83" ){this.onButtonPress(19)}
    else if(event.key == "84" ){this.onButtonPress(20)}
    else if(event.key == "85" ){this.onButtonPress(25)}
    else if(event.key == "86" ){this.onButtonPress(50)}
    else if(event.key == "87" ){this.onButtonPress(0)}
    else if(event.key == "88" ){this.onButtonPress(0)}
    else if(event.key == "89" ){this.onButtonPress(0)}
    else if(event.key == "90"){this.onButtonPress(0)}
      //this.key = event.key;
      //console.log(event.key);
  }
  key: any;
  gameStarted: boolean;
  numPlayers: number;
  currentPlayers: BonanzaPlayer[] = [];
  selectedPlayer: string;
  //playerNames: string[];
  //availablePlayers: string[]=[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.gameStarted = false;
  }

  onStartBonanza(start){
  this.gameStarted = start;
  this.numPlayers = this.currentPlayers.length;
  console.log("bonanza-game.component - onStartBonanza game started with " + this.numPlayers + " players");
  }

  onClickBail(){
    var begin = confirm("Quit game and lose all progress?");
    if (begin == true) {
      this.gameStarted = false;
      this.router.navigate(['/bonanza-game']);
    }
  }
   /* onSelectPlayerNum(players){
    this.numberPlayers = players;

  }
  onSelectPlayer(player){
    //this.selectedPlayer = player;
    this.currentPlayers.push(player);
    console.log('Current Players:  ', this.currentPlayers);
    this.availablePlayers = this.availablePlayers.filter(x => x !== player)
    console.log('Available Players:  ', this.availablePlayers);
  }

    compareObjects(o1: any, o2: any): boolean {
    return o1.name === o2.name && o1._id === o2._id;
  }

  */


  onAddPlayer(player){
    this.currentPlayers.push(player);
    console.log("bonanza-game.component - player received from bonanza-start component ", player);
  }



  onButtonPress(value){
    console.log("Value", value);
  }


}
