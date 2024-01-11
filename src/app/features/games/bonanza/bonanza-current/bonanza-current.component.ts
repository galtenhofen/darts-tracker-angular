import {Component, Input, OnInit} from '@angular/core';
import {BonanzaPlayer} from "@models/bonanza-player";

@Component({
  selector: 'app-bonanza-current',
  templateUrl: './bonanza-current.component.html',
  styleUrls: ['./bonanza-current.component.scss']
})
export class BonanzaCurrentComponent implements OnInit {
  @Input() currentPlayers: BonanzaPlayer[];
  @Input() gameStarted: boolean;
  @Input() numPlayers: number;
  @Input() start: boolean;
  playerNames: string[] = [];
  constructor() { }

  ngOnInit() {
    console.log("current-component : currentPlayers: ", this.currentPlayers);
    this.getPlayerNames();
  }
  getPlayerNames(){
    for (var i = 0; i < this.currentPlayers.length; i++) {
      this.playerNames.push(this.currentPlayers[i].name);
    }

    console.log("current component - playerNames retrieved:  ", this.playerNames)
  }
}
