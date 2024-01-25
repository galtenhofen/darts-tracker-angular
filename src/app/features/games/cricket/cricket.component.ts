import { Component, OnInit, HostListener, Input } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/users.service';
import { CricketPlayer } from 'src/app/models/cricket/cricket-player';
import {CricketTeam} from 'src/app/models/cricket/cricket-team';
import {CricketRoundTeam} from 'src/app/models/cricket/cricket-round-team';
import {CricketRound} from 'src/app/models/cricket/cricket-round';
import {CricketGame} from 'src/app/models/cricket/cricket-game';
import { CricketTeamGame } from 'src/app/models/cricket/cricket-team-game';
import {CricketHit} from 'src/app/models/cricket/cricket-hit';
import Swal from 'sweetalert2';
import { CricketSettings } from 'src/app/models/settings/cricket-settings.model';

@Component({
  selector: 'app-cricket',
  templateUrl: './cricket.component.html',
  styleUrls: ['./cricket.component.css']
})
export class CricketComponent implements OnInit {
  cricketSettings!: CricketSettings;
  multiplier: number = 1;
  playerOne: CricketPlayer = new CricketPlayer(998,'Player 1','');
  playerTwo: CricketPlayer = new CricketPlayer(999,'Player 2','');;
  playerThree!: CricketPlayer;
  playerFour!: CricketPlayer;
  availablePlayers: any[]=[];
  homeTeam!: CricketTeam;
  awayTeam!: CricketTeam;
  numPlayers = 0;
  teams: CricketTeam[] = [];
  homeTeamGame!: CricketTeamGame;
  awayTeamGame!: CricketTeamGame;
  firstPlayerGame!: CricketGame;
  secondPlayerGame!: CricketGame;
  currentTeamRound!: CricketRoundTeam;
  currentRound!: CricketRound;
  key: any;
  inOrder = false;
  quickStart = true;
  gameStarted = false;
  playerList: CricketPlayer[] = [];
  playerIdList: number[] = [];
  currentPlayer!: CricketPlayer;
  currentPlayerId!: number;
  playerIterator = 0;
  playerIdIterator = 0;
  roundNumber = 1;
  throwNum = 1;
  dartOne: any;
  dartTwo: any;
  dartThree: any;
  moreDarts = true;
 twentyClosed = false;
  nineteenClosed = false;
  eighteenClosed = false;
  seventeenClosed = false;
  sixteenClosed = false;
  fifteenClosed = false;
  bullseyeClosed = false;
  twenties = 0;
  nineteens = 0;
  eighteens = 0;
  seventeens = 0;
  sixteens = 0;
  fifteens = 0;
  bullseyes = 0;
  showSingles = true;
  showDoubles = false;
  showTriples = false;

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === '1') {
      this.onHit20(this.multiplier); } else
      if (event.key === '2' )  {this.onHit19(this.multiplier); } else
        if (event.key === '3' )  {this.onHit18(this.multiplier); } else
          if (event.key === '4' )  {this.onHit17(this.multiplier); } else
            if (event.key === '5' )  {this.onHit16(this.multiplier); } else
              if (event.key === '6' )  {this.onHit15(this.multiplier); } else
                if (event.key === '7' )  {this.onHitBullseye(this.multiplier); } else
                //  if (event.key === 'p' )  {this.onPrevPlayer(); } else
                    if (event.key === 'n' )  {this.onNextPlayer(); } else
                      if (event.key === '0' )  {this.onMiss(); } else
                        if (event.key === 's' )  {this.showSingle(); } else
                          // if (event.key === 'd' )  {this.toggleDouble(); } else
                          //   if (event.key === 't' )  {this.toggleTriple(); } else
                              // if (event.key === 'u' )  {this.undoThrow(); } else
                                if (event.key === 'i' )  {this.undoTurn(); }
  }

  constructor(public dataService: DataService, public userService: UserService) { }
  ngOnInit() {
    this.dataService.getCurrentCricketOptions().subscribe(data=>{
      this.cricketSettings = data;
    });
    console.log('settings: ', this.cricketSettings);
    this.gameSetup();

  }

  gameSetup(){
    if(this.cricketSettings?.gameType==='team'){
       this.buildTeams();
    }
    else {  
      this.buildPlayers();
      this.setOrder();
      this.startNewRound();
    }
  }

  buildPlayers(){
    let user1 = this.userService.getUserById(this.cricketSettings.playerIdList[0]);
    console.log('user1', user1);
    if (user1 !== undefined) {
    this.playerOne = new CricketPlayer(this.cricketSettings.playerIdList[0], user1.firstName, user1.lastName, undefined);
    this.firstPlayerGame = new CricketGame(this.playerOne);
    console.log('buildPlayers  this.playerOne', this.playerOne);
    console.log('buildPlayers  this.firstPlayerGame', this.firstPlayerGame);
    this.playerList.push(this.playerOne);
}
    let user2 = this.userService.getUserById(this.cricketSettings.playerIdList[1]);
    console.log('user2', user2);
    if (user2 !== undefined) {
    this.playerTwo = new CricketPlayer(this.cricketSettings.playerIdList[1], user2.firstName, user2.lastName, undefined);
    this.secondPlayerGame = new CricketGame(this.playerTwo);
    console.log('buildPlayers  this.playerTwo', this.playerTwo);
    console.log('buildPlayers  this.secondPlayerGame', this.secondPlayerGame);
    this.playerList.push(this.playerTwo);
}  

this.currentPlayer = this.playerOne;
console.table(this.playerList);
  }

  buildTeams(){

  }

  showSingle() {
    this.multiplier = 1;
    this.showSingles = true;
    this.showDoubles = false;
    this.showTriples = false;
  }

  toggleDouble() {
    if (this.showDoubles === true) {
      this.showSingle();
    } else {
      this.multiplier = 2;
      this.showSingles = false;
      this.showDoubles = true;
      this.showTriples = false;
    }
  }

  toggleTriple() {
    if (this.showTriples === true) {
      this.showSingle();
    } else {
      this.multiplier = 3;
      this.showSingles = false;
      this.showDoubles = false;
      this.showTriples = true;
    }
  }

  onNextPlayer() {
    if (this.playerIterator < (this.playerList.length - 1)) {
      this.playerIterator++;
      this.currentPlayer = this.playerList[this.playerIterator];
    }  else {
      this.playerIterator = 0;
      this.currentPlayer = this.playerList[this.playerIterator];
      this.roundNumber++;
    }
    if (this.currentRound.playerId === this.firstPlayerGame.player.playerId) {
      this.firstPlayerGame.rounds.push(this.currentRound);
    } else
      if (this.currentRound.playerId === this.secondPlayerGame.player.playerId) {
      this.secondPlayerGame.rounds.push(this.currentRound);
    }
    this.moreDarts = true;
    this.throwNum = 1;
    this.startNewRound();
  }

  onSkipPlayer() {
    this.undoTurn();
    if (this.playerIterator < (this.playerList.length - 1)) {
      this.playerIterator++;
      this.currentPlayer = this.playerList[this.playerIterator];
    }  else {
      this.playerIterator = 0;
      this.currentPlayer = this.playerList[this.playerIterator];
    }
  }

  onPreviousPlayer() {
    this.undoTurn();
    if (this.playerIterator < (this.playerList.length - 1)) {
      this.playerIterator--;
      this.currentPlayer = this.playerList[this.playerIterator];
    }  else {
      this.playerIterator = 0;
      this.currentPlayer = this.playerList[this.playerIterator];
    }
  }

  startNewRound() {
    console.log('***Enter startNewRound');
    console.log('this.currentPlayer',this.currentPlayer);
    this.currentRound = new CricketRound(this.currentPlayer.playerId);
    console.log('currentRound: ', this.currentRound);
    console.log();
  }
  
  startNewTeamRound() {
    this.currentTeamRound = new CricketRoundTeam(this.currentPlayer.playerId, this.currentPlayer.teamId ? this.currentPlayer.teamId : 0);
    console.log('currentTeamRound: ', this.currentTeamRound);
    }
  

    setOrderTeam() {
      this.getPlayerListTeam(this.awayTeamGame, this.homeTeamGame);
      this.currentPlayer = this.playerList[this.playerIterator];
      this.currentPlayerId = this.playerIdList[this.playerIdIterator];
    }
  
    setOrder() {
      console.log('***Enter setOrder');
      // if (this.quickStart === true) {
      //   this.setQuickstartPlayerList();
      // }
      this.currentPlayer = this.playerList[this.playerIterator];
      this.currentPlayerId = this.playerIdList[this.playerIdIterator];
      console.log('currentPlayer', this.currentPlayer);
      console.log('currentPlayer', this.currentPlayerId);
      console.log('this.playerIdList', this.playerIdList);
    }

    setQuickstartPlayerList() {
      this.playerList.push(this.firstPlayerGame.player);
      this.playerList.push(this.secondPlayerGame.player);
    }


    getPlayerListTeam(awayTeam: CricketTeamGame, HomeTeam: CricketTeamGame) {
      this.playerList.push(this.awayTeamGame.team.playerOne);
      this.playerList.push(this.homeTeamGame.team.playerOne);
      this.playerList.push(this.awayTeamGame.team.playerTwo);
      this.playerList.push(this.homeTeamGame.team.playerTwo);
    }
  
    // getPlayerList(currentPlayers: any[]) {
    //   console.log('***Enter setPlayerList');
    //     currentPlayers.forEach(function(this: any, item: { firstName: string; lastName: string; playerId: number; }) {
    //     const newPlayer = new CricketPlayer(item.firstName, item.lastName, item.playerId);
    //     this.playerList.push(newPlayer);
    //   });
    //   console.log('this.playerList', this.playerList);
    // }
  
  
  /*onNextTeamPlayer() {
    if (this.playerIterator < 3) {
      this.playerIterator++;
      this.currentPlayer = this.playerList[this.playerIterator];
    }  else {
      this.playerIterator = 0;
      this.currentPlayer = this.playerList[this.playerIterator];
      this.roundNumber++;
    }
    this.moreDarts = true;
      this.throwNum = 1;
    this.startNewTeamRound();
  }

  onPrevTeamPlayer() {
    // const previous = confirm('Do you want to go back to previous player and re-enter their round?');
   // if (previous === true) {
      if (this.playerIterator > 0) {
        this.playerIterator--;
        this.currentPlayer = this.playerList[this.playerIterator];
      } else {
        if (this.roundNumber > 1 ) {
          this.playerIterator = 3;
          this.currentPlayer = this.playerList[this.playerIterator];
          this.roundNumber--;
        }  else {
          alert('This is the first player.');
        }
      }
      this.moreDarts = true;
      this.throwNum = 1;
   // }
}*/

  undoThrow(player: number, num: number, mult: number) {
    console.log('undoThrow: ', player, num, mult);
    if (player === this.firstPlayerGame.player.playerId) {
      if (num === 20) {
        for (let i = 0; i < mult; i++) {
          this.firstPlayerGame.twenties--;
        }
      } else if (num === 19) {
        for (let i = 0; i < mult; i++) {
          this.firstPlayerGame.nineteens--;
        }
      } else if (num === 18) {
        for (let i = 0; i < mult; i++) {
          this.firstPlayerGame.eighteens--;
        }
      } else if (num === 17) {
        for (let i = 0; i < mult; i++) {
          this.firstPlayerGame.seventeens--;
        }
      } else if (num === 16) {
        for (let i = 0; i < mult; i++) {
          this.firstPlayerGame.sixteens--;
        }
      } else if (num === 15) {
        for (let i = 0; i < mult; i++) {
          this.firstPlayerGame.fifteens--;
        }
      } else if (num === 25) {
        for (let i = 0; i < mult; i++) {
          this.firstPlayerGame.bullseyes--;
        }
      }
    } else
      if (player === this.secondPlayerGame.player.playerId) {
        if (num === 20) {
          for (let i = 0; i < mult; i++) {
            this.secondPlayerGame.twenties--;
          }
        } else if (num === 19) {
          for (let i = 0; i < mult; i++) {
            this.secondPlayerGame.nineteens--;
          }
        } else if (num === 18) {
          for (let i = 0; i < mult; i++) {
            this.secondPlayerGame.eighteens--;
          }
        } else if (num === 17) {
          for (let i = 0; i < mult; i++) {
            this.secondPlayerGame.seventeens--;
          }
        } else if (num === 16) {
          for (let i = 0; i < mult; i++) {
            this.secondPlayerGame.sixteens--;
          }
        } else if (num === 15) {
          for (let i = 0; i < mult; i++) {
            this.secondPlayerGame.fifteens--;
          }
        } else if (num === 25) {
          for (let i = 0; i < mult; i++) {
            this.secondPlayerGame.bullseyes--;
          }
        }
      }
  }

  undoTurn() {
    const self = this;
    console.log('undoTurn  this.currentRound: ', this.currentRound.darts);
    this.currentRound.darts.forEach(function(item) {
      console.log('throw: ', item.target);
      if (item.target > 0) {
        self.undoThrow(self.currentRound.playerId, item.target, item.multiplier);
      }
      });
  }

/* onHit(number, multiplier) {
    if (this.currentRound.teamId === this.awayTeamGame.team.teamId) {
      if (this.throwNum <= 3) {
        switch (number) {
          case 20:
            console.log('You hit the 20 (times ' + number + ')');
          for
            (let
            i = 0;
            i < multiplier;
            i++
          )
          {
            this.awayTeamGame.twenties++;
          }
            if (this.awayTeamGame.twenties > 2) {
              console.log('You closed the twenties');
            }
            break;
        }
        this.processThrow();

      }
    }
    else if (this.currentRound.teamId === this.homeTeamGame.team.teamId) {
      if (this.throwNum <= 3 && this.homeTeamGame.twentyClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.homeTeamGame.twenties++;

          this.addScore(20);
        }
        if (this.homeTeamGame.twenties > 2) {
          console.log('You closed the twenties');
        }
      }
      this.processThrow();
      console.log('onHit20 twenties: ', this.homeTeamGame.twenties);
    }
  } */

  checkForClosed() {
    if (this.firstPlayerGame.twenties > 2) {
      this.firstPlayerGame.twentyClosed = true;
    }
    if (this.firstPlayerGame.nineteens > 2) {
      this.firstPlayerGame.nineteenClosed = true;
    }
    if (this.firstPlayerGame.eighteens > 2) {
      this.firstPlayerGame.eighteenClosed = true;
    }
    if (this.firstPlayerGame.seventeens > 2) {
      this.firstPlayerGame.seventeenClosed = true;
    }
    if (this.firstPlayerGame.sixteens > 2) {
      this.firstPlayerGame.sixteenClosed = true;
    }
    if (this.firstPlayerGame.fifteens > 2) {
      this.firstPlayerGame.fifteenClosed = true;
    }
    if (this.firstPlayerGame.bullseyes > 2) {
      this.firstPlayerGame.bullseyeClosed = true;
    }
    if (this.secondPlayerGame.twenties > 2) {
      this.secondPlayerGame.twentyClosed = true;
    }
    if (this.secondPlayerGame.nineteens > 2) {
      this.secondPlayerGame.nineteenClosed = true;
    }
    if (this.secondPlayerGame.eighteens > 2) {
      this.secondPlayerGame.eighteenClosed = true;
    }
    if (this.secondPlayerGame.seventeens > 2) {
      this.secondPlayerGame.seventeenClosed = true;
    }
    if (this.secondPlayerGame.sixteens > 2) {
      this.secondPlayerGame.sixteenClosed = true;
    }
    if (this.secondPlayerGame.fifteens > 2) {
      this.secondPlayerGame.fifteenClosed = true;
    }
    if (this.secondPlayerGame.bullseyes > 2) {
      this.secondPlayerGame.bullseyeClosed = true;
    }
  }

  hit(num : number){
    switch (num) {
      case 20: this.onHit20(this.multiplier);
      break;
      case 19: this.onHit19(this.multiplier);
      break;
      case 18: this.onHit18(this.multiplier);
      break;
      case 17: this.onHit17(this.multiplier);
      break;
      case 16: this.onHit16(this.multiplier);
      break;
      case 15: this.onHit15(this.multiplier);
      break;
      case 25: this.onHitBullseye(this.multiplier);
      break;
    }
  }

  updateMultiplier(num : number){
    console.log('user change multiplier to ' + num);
    this.multiplier = num;
      }

  onHit20(multiplier: number) {
    console.log('hit 20');
    const hit = new CricketHit(20, multiplier);
    if (this.currentRound.playerId === this.firstPlayerGame.player.playerId) {
      if (this.currentRound.darts.length < 3 && this.firstPlayerGame.twentyClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.firstPlayerGame.twenties++;
        }
        this.currentRound.darts.push(hit);
        /*if (this.firstPlayerGame.twenties > 2) {
          this.firstPlayerGame.twentyClosed = true;
        }*/
      }
      this.processThrow();

    } else if (this.currentRound.playerId === this.secondPlayerGame.player.playerId) {
      if (this.currentRound.darts.length <= 3 && this.secondPlayerGame.twentyClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.secondPlayerGame.twenties++;
        }
        this.currentRound.darts.push(hit);
       /* if (this.secondPlayerGame.twenties > 2) {
          this.secondPlayerGame.twentyClosed = true;
        }*/
      }
      this.processThrow();

    }
  }
  onHit19(multiplier: number) {
    console.log('hit 19');
    const hit = new CricketHit(19, multiplier);
    if (this.currentRound.playerId === this.firstPlayerGame.player.playerId) {
      if (this.throwNum <= 3 && this.firstPlayerGame.nineteenClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.firstPlayerGame.nineteens++;
        }
        this.currentRound.darts.push(hit);
     /*   if (this.firstPlayerGame.nineteens > 2) {
          this.firstPlayerGame.nineteenClosed = true;
        }*/
      }
      this.processThrow();
    } else if (this.currentRound.playerId === this.secondPlayerGame.player.playerId) {
      if (this.throwNum <= 3 && this.secondPlayerGame.nineteenClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.secondPlayerGame.nineteens++;
        }
        this.currentRound.darts.push(hit);
      /*  if (this.secondPlayerGame.nineteens > 2) {
          this.secondPlayerGame.nineteenClosed = true;
        }*/
      }
      this.processThrow();
    }
  }

  onHit18(multiplier: number) {
    console.log('hit 18');
    const hit = new CricketHit(18, multiplier);
    if (this.currentRound.playerId === this.firstPlayerGame.player.playerId) {
      if (this.throwNum <= 3 && this.firstPlayerGame.eighteenClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.firstPlayerGame.eighteens++;
        }
        this.currentRound.darts.push(hit);
       /* if (this.firstPlayerGame.eighteens > 2) {
          this.firstPlayerGame.eighteenClosed = true;
        }*/
      }
      this.processThrow();
    } else if (this.currentRound.playerId === this.secondPlayerGame.player.playerId) {
      if (this.throwNum <= 3 && this.secondPlayerGame.eighteenClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.secondPlayerGame.eighteens++;

    //      this.addScore(20);
        }
        this.currentRound.darts.push(hit);
     /*   if (this.secondPlayerGame.eighteens > 2) {
          this.secondPlayerGame.eighteenClosed = true;
        }*/
     }
      this.processThrow();
    }
  }

  onHit17(multiplier: number) {
    console.log('hit 17');
    const hit = new CricketHit(17, multiplier);
    if (this.currentRound.playerId === this.firstPlayerGame.player.playerId) {
      if (this.throwNum <= 3 && this.firstPlayerGame.seventeenClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.firstPlayerGame.seventeens++;

         // this.addScore(20);
        }
        this.currentRound.darts.push(hit);
      /*  if (this.firstPlayerGame.seventeens > 2) {
          this.firstPlayerGame.seventeenClosed = true;
        }*/
      }
      this.processThrow();
    } else if (this.currentRound.playerId === this.secondPlayerGame.player.playerId) {
      if (this.throwNum <= 3 && this.secondPlayerGame.seventeenClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.secondPlayerGame.seventeens++;

       //   this.addScore(20);
        }
        this.currentRound.darts.push(hit);
       /* if (this.secondPlayerGame.seventeens > 2) {
          this.secondPlayerGame.seventeenClosed = true;
        }*/
      }
      this.processThrow();
    }
  }
  onHit16(multiplier: number) {
    console.log('hit 16');
    const hit = new CricketHit(16, multiplier);
    if (this.currentRound.playerId === this.firstPlayerGame.player.playerId) {
      if (this.throwNum <= 3 && this.firstPlayerGame.sixteenClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.firstPlayerGame.sixteens++;

      //    this.addScore(20);
        }
        this.currentRound.darts.push(hit);
      /*  if (this.firstPlayerGame.sixteens > 2) {
          this.firstPlayerGame.sixteenClosed = true;
        }*/
      }
      this.processThrow();
    } else if (this.currentRound.playerId === this.secondPlayerGame.player.playerId) {
      if (this.throwNum <= 3 && this.secondPlayerGame.sixteenClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.secondPlayerGame.sixteens++;

      //    this.addScore(20);
        }
        this.currentRound.darts.push(hit);
        /*if (this.secondPlayerGame.sixteens > 2) {
          this.secondPlayerGame.sixteenClosed = true;
        }*/
      }
      this.processThrow();
    }
  }
  onHit15(multiplier: number) {
    console.log('hit 15');
    const hit = new CricketHit(15, multiplier);
    if (this.currentRound.playerId === this.firstPlayerGame.player.playerId) {
      if (this.throwNum <= 3 && this.firstPlayerGame.fifteenClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.firstPlayerGame.fifteens++;

          //  this.addScore(20);
        }
        this.currentRound.darts.push(hit);
       /* if (this.firstPlayerGame.fifteens > 2) {
          this.firstPlayerGame.fifteenClosed = true;
        }*/
      }
      this.processThrow();
    } else if (this.currentRound.playerId === this.secondPlayerGame.player.playerId) {
      if (this.throwNum <= 3 && this.secondPlayerGame.fifteenClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.secondPlayerGame.fifteens++;

          //  this.addScore(20);
        }
        this.currentRound.darts.push(hit);
        /*if (this.secondPlayerGame.fifteens > 2) {
          this.secondPlayerGame.fifteenClosed = true;
        }*/
        this.processThrow();
      }
    }
  }
  onHitBullseye(multiplier: number) {
    console.log('hit bull');
    const hit = new CricketHit(25, multiplier);
    if (this.currentRound.playerId === this.firstPlayerGame.player.playerId) {
      if (this.throwNum <= 3 && this.firstPlayerGame.bullseyeClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.firstPlayerGame.bullseyes++;

      //    this.addScore(20);
        }
        this.currentRound.darts.push(hit);
      /*  if (this.firstPlayerGame.bullseyes > 2) {
          this.firstPlayerGame.bullseyeClosed = true;
        }*/
      }
      this.processThrow();
    } else if (this.currentRound.playerId === this.secondPlayerGame.player.playerId) {
      if (this.throwNum <= 3 && this.secondPlayerGame.bullseyeClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.secondPlayerGame.bullseyes++;

      //    this.addScore(20);
        }
        this.currentRound.darts.push(hit);
       /* if (this.secondPlayerGame.bullseyes > 2) {
          this.secondPlayerGame.bullseyeClosed = true;
        }*/
      }
      this.processThrow();
    }
  }
  onMiss()  {
    console.log('ain\'t hit shit');
    const hit = new CricketHit(0, 0);
    if (this.currentRound.playerId === this.firstPlayerGame.player.playerId) {
      if (this.currentRound.darts.length < 3) {
        this.currentRound.darts.push(hit);
      }
      this.processThrow();
      console.log('You suck.');
    } else if (this.currentRound.playerId === this.secondPlayerGame.player.playerId) {
      if (this.currentRound.darts.length < 3) {
        this.currentRound.darts.push(hit);
      }
      this.processThrow();
      console.log('You suck.');
    }

    console.log('onMiss currentRound: ', this.currentRound);
  }
/*
  onTeamHit20(multiplier) {
    const hit = new CricketHit(20, multiplier);
    if (this.currentTeamRound.teamId === this.awayTeamGame.team.teamId) {
      if (this.currentRound.darts.length < 3 && this.awayTeamGame.twentyClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.awayTeamGame.twenties++;
        }
        this.currentRound.darts.push(hit);

        if (this.awayTeamGame.twenties > 2) {
          this.awayTeamGame.twentyClosed = true;
        }
      }
      this.processThrow();  // kill this
      console.log('Away Team twenties: ', this.awayTeamGame.twenties);
    } else if (this.currentTeamRound.teamId === this.homeTeamGame.team.teamId) {
      if (this.currentRound.darts.length <= 3 && this.homeTeamGame.twentyClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.homeTeamGame.twenties++;
        }
        this.currentRound.darts.push(hit);
        if (this.homeTeamGame.twenties > 2) {
          this.homeTeamGame.twentyClosed = true;
        }
      }
      this.processThrow(); // kill this
      console.log('onHit20 twenties: ', this.homeTeamGame.twenties);
    }

    console.log('onHit20 currentRound: ', this.currentRound);

  }
  onTeamHit19(multiplier) {
    if (this.currentTeamRound.teamId === this.awayTeamGame.team.teamId) {
      if (this.throwNum <= 3 && this.awayTeamGame.nineteenClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.awayTeamGame.nineteens++;

          this.addScore(20);
        }
        if (this.awayTeamGame.nineteens > 2) {
          console.log('You closed the nineteens');
        }
      }
      this.processThrow();
      console.log('Away Team nineteens: ', this.awayTeamGame.nineteens);
    } else if (this.currentTeamRound.teamId === this.homeTeamGame.team.teamId) {
      if (this.throwNum <= 3 && this.homeTeamGame.nineteenClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.homeTeamGame.nineteens++;

          this.addScore(20);
        }
        if (this.homeTeamGame.nineteens > 2) {
          console.log('You closed the nineteens');
        }
      }
      this.processThrow();
      console.log('onHit20 nineteens: ', this.homeTeamGame.nineteens);
    }
  }

  onTeamHit18(multiplier) {
    if (this.currentTeamRound.teamId === this.awayTeamGame.team.teamId) {
      if (this.throwNum <= 3 && this.awayTeamGame.eighteenClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.awayTeamGame.eighteens++;

          this.addScore(20);
        }
        if (this.awayTeamGame.eighteens > 2) {
          console.log('You closed the eighteens');
        }
      }
      this.processThrow();
      console.log('Away Team eighteens: ', this.awayTeamGame.eighteens);
    } else if (this.currentTeamRound.teamId === this.homeTeamGame.team.teamId) {
      if (this.throwNum <= 3 && this.homeTeamGame.eighteenClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.homeTeamGame.eighteens++;

          this.addScore(20);
        }
        if (this.homeTeamGame.eighteens > 2) {
          console.log('You closed the eighteens');
        }
      }
      this.processThrow();
      console.log('onHit20 eighteens: ', this.homeTeamGame.eighteens);
    }
  }

  onTeamHit17(multiplier) {
    if (this.currentTeamRound.teamId === this.awayTeamGame.team.teamId) {
      if (this.throwNum <= 3 && this.awayTeamGame.seventeenClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.awayTeamGame.seventeens++;

          this.addScore(20);
        }
        if (this.awayTeamGame.seventeens > 2) {
          console.log('You closed the seventeens');
        }
      }
      this.processThrow();
      console.log('Away Team seventeens: ', this.awayTeamGame.seventeens);
    } else if (this.currentTeamRound.teamId === this.homeTeamGame.team.teamId) {
      if (this.throwNum <= 3 && this.homeTeamGame.seventeenClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.homeTeamGame.seventeens++;

          this.addScore(20);
        }
        if (this.homeTeamGame.seventeens > 2) {
          console.log('You closed the seventeens');
        }
      }
      this.processThrow();
      console.log('onHit20 seventeens: ', this.homeTeamGame.seventeens);
    }
  }
  onTeamHit16(multiplier) {
    if (this.currentTeamRound.teamId === this.awayTeamGame.team.teamId) {
      if (this.throwNum <= 3 && this.awayTeamGame.sixteenClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.awayTeamGame.sixteens++;

          this.addScore(20);
        }
        if (this.awayTeamGame.sixteens > 2) {
          console.log('You closed the sixteens');
        }
      }
      this.processThrow();
      console.log('Away Team sixteens: ', this.awayTeamGame.sixteens);
    } else if (this.currentTeamRound.teamId === this.homeTeamGame.team.teamId) {
      if (this.throwNum <= 3 && this.homeTeamGame.sixteenClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.homeTeamGame.sixteens++;

          this.addScore(20);
        }
        if (this.homeTeamGame.sixteens > 2) {
          console.log('You closed the sixteens');
        }
      }
      this.processThrow();
      console.log('onHit20 sixteens: ', this.homeTeamGame.sixteens);
    }
  }
  onTeamHit15(multiplier) {
    if (this.currentTeamRound.teamId === this.awayTeamGame.team.teamId) {
      if (this.throwNum <= 3 && this.awayTeamGame.fifteenClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.awayTeamGame.fifteens++;

          this.addScore(20);
        }
        if (this.awayTeamGame.fifteens > 2) {
          console.log('You closed the fifteens');
        }
      }
      this.processThrow();
      console.log('Away Team fifteens: ', this.awayTeamGame.fifteens);
    } else if (this.currentTeamRound.teamId === this.homeTeamGame.team.teamId) {
      if (this.throwNum <= 3 && this.homeTeamGame.fifteenClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.homeTeamGame.fifteens++;

          this.addScore(20);
        }
        if (this.homeTeamGame.fifteens > 2) {
          console.log('You closed the fifteens');
        }
      }
      this.processThrow();
      console.log('onHit20 fifteens: ', this.homeTeamGame.fifteens);
    }
  }
  onTeamHitBullseye(multiplier) {
    if (this.currentTeamRound.teamId === this.awayTeamGame.team.teamId) {
      if (this.throwNum <= 3 && this.awayTeamGame.bullseyeClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.awayTeamGame.bullseyes++;

          this.addScore(20);
        }
        if (this.awayTeamGame.bullseyes > 2) {
          console.log('You closed the bullseyes');
        }
      }
      this.processThrow();
      console.log('Away Team bullseyes: ', this.awayTeamGame.bullseyes);
    } else if (this.currentTeamRound.teamId === this.homeTeamGame.team.teamId) {
      if (this.throwNum <= 3 && this.homeTeamGame.bullseyeClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.homeTeamGame.bullseyes++;

          this.addScore(20);
        }
        if (this.homeTeamGame.bullseyes > 2) {
          console.log('You closed the bullseyes');
        }
      }
      this.processThrow();
      console.log('onHit20 bullseyes: ', this.homeTeamGame.bullseyes);
    }
  }
  onTeamMiss()  {
    const hit = new CricketHit(0, 0);
    if (this.currentTeamRound.teamId === this.awayTeamGame.team.teamId) {
      if (this.currentRound.darts.length < 3) {
        this.currentRound.darts.push(hit);
        }
      this.processThrows();
      console.log('You suck.');
    } else if (this.currentTeamRound.teamId === this.homeTeamGame.team.teamId) {
      if (this.currentRound.darts.length < 3) {
        this.currentRound.darts.push(hit);
      }
      this.processThrows();
      console.log('You suck.');
    }

    console.log('onMiss currentRound: ', this.currentRound);
  }*/

  processThrow() {
    console.log('processThrow   currentRound: ', this.currentRound)
    this.throwNum++;
    if (this.throwNum < 4 ) {
    }  else {
      Swal.fire({
        title: 'Turn Complete',
        text: 'Commit score and move to next player?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Undo Turn',
        confirmButtonText: 'Next Player',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          this.checkForClosed();
          if (this.currentRound.darts.filter(d => d.target > 0 ).length === ((this.currentRound.bib+1)*3) ) {
            this.currentRound.bib++;
            Swal.fire('That\'s a BiB. Still '+this.currentPlayer.firstName+'\'s turn.');
            this.moreDarts = true;
            this.throwNum = 1;
            this.currentPlayer.bibs++;
          } else {
            this.onNextPlayer();
          }
        } else {
          this.undoTurn();
          this.moreDarts = true;
          this.throwNum = 1;
          this.startNewRound();
        }
      });
      this.moreDarts = false;
    }
    this.showSingle();
  }

  addScore(num: string)  {
console.log('You got ' + num + ' points.');
  }

}

