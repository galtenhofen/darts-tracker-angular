import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { CricketSettings, CricketSettingsImpl } from 'src/app/models/settings/cricket-settings.model';

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
    this.dataService.getCurrentCricketOptions().subscribe(data=>{
      this.cricketSettings = data;
    });
    //this.cricketSettings = this.dataService.getCurrentCricketOptions() ?? new CricketSettingsImpl;
    this.gameStarted = this.cricketSettings ? this.cricketSettings.gameStarted : false;
  }

  enableStartGame(gameType: string){
  console.log('lfg :', gameType);
  this.gameStarted = true;

}

}
