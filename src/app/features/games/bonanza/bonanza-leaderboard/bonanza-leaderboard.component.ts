import { Component, OnInit, Input } from '@angular/core';
import {BonanzaPlayer} from "@models/bonanza-player";

@Component({
  selector: 'app-bonanza-leaderboard',
  templateUrl: './bonanza-leaderboard.component.html',
  styleUrls: ['./bonanza-leaderboard.component.scss']
})
export class BonanzaLeaderboardComponent implements OnInit {
  @Input() currentPlayers: BonanzaPlayer[];
  @Input() gameStarted: boolean;
  @Input() numPlayers: number;
  @Input() start: boolean;

  playerNames: string[] = [];


  constructor() { }

  ngOnInit() {
console.log("leaderboard-component : currentPlayers: ", this.currentPlayers);
  this.getPlayerNames();

  }

  getPlayerNames(){
    for (var i = 0; i < this.currentPlayers.length; i++) {
        this.playerNames.push(this.currentPlayers[i].name);
    }

    console.log("leaderboard component - playerNames retrieved:  ", this.playerNames)
  }

}
