import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { CricketSettings } from 'src/app/models/settings/cricket-settings.model';

@Component({
  selector: 'app-game-container',
  templateUrl: './game-container.component.html',
  styleUrls: ['./game-container.component.css']
})
export class GameContainerComponent implements OnInit {
cricketSettings: CricketSettings | undefined;
currentGame: string = "";
gameStarted: boolean = false;
gameType: string = "";

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    console.log('init game container - get settings')
    this.cricketSettings = this.dataService.getCurrentCricketOptions();
    this.gameStarted = this.cricketSettings ? this.cricketSettings.gameStarted : false;
  }

  enableStartGame(gameType: string){
  console.log('lfg :', gameType);
  this.gameStarted = true;

}

}
