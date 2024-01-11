import {Component, OnInit, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {BonanzaPlayer} from '../../../../shared/models/bonanza-player';
import {BonanzaService} from '../../../services/bonanza.service'

@Component({
  selector: 'app-bonanza-start',
    templateUrl: './bonanza-start.component.html',
    styleUrls: ['./bonanza-start.component.scss']
})
export class BonanzaStartComponent implements OnInit{
  @Output() bonanzaStarted: EventEmitter<any> = new EventEmitter();
  @Output() bonanzaPlayerAdded: EventEmitter<any> = new EventEmitter();
  @Input() start: boolean;


  numPlayers: number[];
  numberPlayers: number;
  currentPlayers: BonanzaPlayer[];
  selectedPlayer: string;
  playerName: string[];
  player1: string="";
  player2: string="";
  player3: string="";
  player4: string="";
  player5: string="";
  player6: string="";
  player7: string="";
  player8: string="";
  submitDisabled: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.submitDisabled = true;
    this.currentPlayers = [];
    this.numPlayers  = [2,3,4,5,6,7,8];
    //this.selectedPlayer = "";
  }


  onSelectPlayerNum(players){
    this.numberPlayers = players;

  }
  onSelectPlayer(name, playerNum){
    let newPlayer = new BonanzaPlayer(name, playerNum);
    console.log('Adding Player:  ', newPlayer);
    this.currentPlayers.push(newPlayer);
    console.log('Current Players:  ', JSON.stringify(this.currentPlayers));
    this.bonanzaPlayerAdded.emit(newPlayer);
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.name === o2.name && o1._id === o2._id;
  }

  submit(){
    var begin = confirm("Start game with " + this.currentPlayers.length + " players?");
    if (begin == true) {
      this.bonanzaStarted.emit(true);

    }
  }

  canSubmit(){
    if(this.currentPlayers.length >1 && this.currentPlayers.length === this.numberPlayers)
    {
      return false
    }
    else
      return true;
  }


}
