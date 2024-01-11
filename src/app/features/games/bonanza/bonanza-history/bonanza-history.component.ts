import {Component, Input, OnInit} from '@angular/core';
import {BonanzaPlayer} from "@models/bonanza-player";

@Component({
  selector: 'app-bonanza-history',
  templateUrl: './bonanza-history.component.html',
  styleUrls: ['./bonanza-history.component.scss']
})
export class BonanzaHistoryComponent implements OnInit {
  @Input() currentPlayers: BonanzaPlayer[];
  @Input() gameStarted: boolean;
  @Input() numPlayers: number;
  @Input() start: boolean;
  playerNames: string[] = [];
  constructor() { }

  ngOnInit() {
    console.log("history-component : currentPlayers: ", this.currentPlayers);
    this.getPlayerNames();
  }
  getPlayerNames(){
    for (var i = 0; i < this.currentPlayers.length; i++) {
      this.playerNames.push(this.currentPlayers[i].name);
    }

    console.log("history component - playerNames retrieved:  ", this.playerNames)
  }

}
