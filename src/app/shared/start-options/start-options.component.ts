import { ChangeDetectorRef,Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CricketPlayer } from 'src/app/models/cricket/cricket-player';
import { CricketTeam } from 'src/app/models/cricket/cricket-team';
import { CricketTeamGame} from 'src/app/models/cricket/cricket-team-game';
import { CricketGame } from 'src/app/models/cricket/cricket-game';
import { CricketRoundTeam } from 'src/app/models/cricket/cricket-round-team';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';
import { User } from 'src/app/models/user.model';
import { Team } from 'src/app/models/team.model';
import { UserService } from 'src/app/services/users.service';
import { CricketSettings, CricketSettingsImpl } from 'src/app/models/settings/cricket-settings.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-options',
  templateUrl: './start-options.component.html',
  styleUrls: ['./start-options.component.css']
})
export class StartOptionsComponent implements OnInit {
  @Output() startGame = new EventEmitter<string>();
  @ViewChild('stepper') stepper: any;
  @ViewChild('teamStepper') teamStepper: any;

  cricketSettings: CricketSettings = new CricketSettingsImpl();
  
  playerOne!: CricketPlayer;
  playerTwo!: CricketPlayer;
  playerThree!: CricketPlayer;
  playerFour!: CricketPlayer;

  numPlayers = 0;
  teams: Team[] = [];
  homeTeamGame!: CricketTeamGame;
  awayTeamGame!: CricketTeamGame;
  firstPlayerGame!: CricketGame;
  secondPlayerGame!: CricketGame;
  currentTeamRound!: CricketRoundTeam;
  key: any;
  inOrder = true;
  quickStart = true;
  gameStarted = false;
  gameType: string = "";
  message = 'Go In Order';
  
  availablePlayers: User[] = [];
  selectedUser1: string ="";
  selectedUser2: string ="";
  userOne: any;
  userTwo: any;
  filteredUserList:  User[] = [];

  availableTeams: Team[] = [];
  selectedTeam1: string ="";
  selectedTeam2: string ="";
  teamOne: any;
  teamTwo: any;
  filteredTeamList:  Team[] = [];

  constructor(//public router: Router,
    public dataService: DataService, 
    public router: Router,
    public userService: UserService, 
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.dataService.getCurrentCricketOptions().subscribe(data=>{
      this.cricketSettings = data;
    });
    //this.cricketSettings = this.dataService.getCurrentCricketOptions();
    console.log('init start options', this.cricketSettings);
    this.availablePlayers = this.userService.getUsers();
    this.availableTeams = this.userService.getTeams();
  }

  // getPlayerListTeam(awayTeam: CricketTeamGame, HomeTeam: CricketTeamGame) {
  //   this.userList.push(this.awayTeamGame.team.playerOne);
  //   this.userList.push(this.homeTeamGame.team.playerOne);
  //   this.userList.push(this.awayTeamGame.team.playerTwo);
  //   this.userList.push(this.homeTeamGame.team.playerTwo);
  // }

  createNewTeam(){
    console.log('Enter createNewTeam');
  }

  // getPlayerList(currentPlayers: any[]) {
  //   console.log('***Enter setPlayerList');
  //     currentPlayers.forEach(function(this: any, item: { firstName: string; lastName: string; playerId: number; }) {
  //     const newPlayer = new CricketPlayer(item.firstName, item.lastName, item.playerId);
  //     this.playerList.push(newPlayer);
  //   });
  //   console.log('this.playerList', this.availablePlayers);
  // }

  setQuickstartPlayerList() {
    //this.userList.push(this.firstPlayerGame.player);
    //this.userList.push(this.secondPlayerGame.player);
  }

//   receivePlayerCount() {
//     console.log('***Enter receivePlayerCount');
//     const self = this;
//     Swal.fire({
//       text: 'How Many Players?',
//       input: 'radio',
//       inputOptions: {
//         1: 'One',
//         2: 'Two',
//         3: 'Three',
//         4: 'Four'
//       },
//       showCancelButton: true,
//     }).then(function (inputValue) {
//       if (inputValue) {
//         self.gatherPlayers(Number(inputValue.value));
//       }
//     });
//   }

//   gatherPlayers(numPlayers: number) {
//     console.log('***Enter gatherPlayers');
//     const optionMap = this.availablePlayers.map((a: { firstName: any; }) => a.firstName);
//     const questions = [];
//     for (let _i = 1; _i <= numPlayers; _i++) {
//       const pnum = _i + 1;
//       questions.push({text: 'Select Player ' + _i + ' from available players'});
//     }
//     Swal.mixin({
//       input: 'select',
//       inputOptions: this.availablePlayers.map((a: { firstName: any }) => a.firstName),
//       showCancelButton: true,
//     }).queue(questions).then((result: any) => {
//       const resultValue = result.value as string[];
//       if (resultValue) {
//         const chosenPlayers = this.dataService.getPlayerNamesByIds(resultValue);
//         const playerz = JSON.stringify(chosenPlayers);
//         this.getPlayerList(chosenPlayers);
//       }
//     });
//     // this.gameStarted = true;
//     // this.setOrder();
//     // this.startNewRound();
// }

startTeam(){
this.gameType = 'team';
}

  start() {
    this.gameType = 'individual';
  }

  // enableQuickStartTeam() {
  //   console.log('***Enter enableQuickStartTeam');
  //   this.playerOne = new CricketPlayer('Gabe', 'Altenhofen', 1 );
  //   this.playerTwo = new CricketPlayer('Luke', 'Lorenz', 2);
  //    this.playerThree = new CricketPlayer('Paul', 'Loftis', 3, 2);
  //    this.playerFour = new CricketPlayer('Bryan', 'Swalley', 4, 2);
  //    this.homeTeam = new CricketTeam(1, 'The Donnybrooks', this.playerOne, this.playerTwo, true);
  //    this.awayTeam = new CricketTeam(2, 'Merica', this.playerThree, this.playerFour, false);
  //    //this.teams = [this.awayTeam, this.homeTeam];

  //   this.awayTeamGame = new CricketTeamGame(this.awayTeam);
  //   this.homeTeamGame = new CricketTeamGame(this.homeTeam);
  // }

  enableQuickStart() {
    console.log('***Enter enableQuickStart');
    this.quickStart = true;
    this.playerOne = new CricketPlayer(998,'Player1', '', 1);
    this.playerTwo = new CricketPlayer(999,'Player2', '', 2);
    this.firstPlayerGame = new CricketGame(this.playerOne);
    this.secondPlayerGame = new CricketGame(this.playerTwo);
    this.inOrder = true
    this.userOne = {userId: 996, firstName: 'Player 1', lastName: '', email: ''};
    this.userTwo = {userId: 997, firstName: 'Player 2', lastName: '', email: ''};
    this.enableStartGame('individual');

    // const swalWithBootstrapButtons = Swal.mixin({
    //   customClass: {
    //     confirmButton: 'btn btn-success',
    //     cancelButton: 'btn btn-warning'
    //   },
    //   buttonsStyling: false
    // });
    // swalWithBootstrapButtons.fire({
    //   title: 'Select Game Type',
    //   text: 'Must go in order?',
    //   icon: 'question',
    //   showCancelButton: true,
    //   confirmButtonText: ' Slop counts ',
    //   cancelButtonText: ' Go in order ',
    //   reverseButtons: false
    // }).then((result) => {
    //   if (result.value) {
    //     this.inOrder = true;
    //   } else if (
    //     result.dismiss === Swal.DismissReason.cancel
    //   ) {
    //     this.inOrder = false;
    //   }
    // });
  }

  // openCreateTeamDialog(): void {
  //   Swal.fire({
  //     title: 'Create New Team',
  //     html: `
  //     <input id="teamName" class="swal2-input" placeholder="Team Name" value="${this.newTeamName}" required>
  //     <select id="user1" class="swal2-select" [(ngModel)]="selectedUser1" (ngModelChange)="updateDropdowns($event, 'user2')" required>
  //       <option value="" disabled selected>Choose a player</option>
  //       ${this.availableUsers.map(
  //         (user) =>
  //           `<option value='${JSON.stringify(user)}' ${
  //             user === this.selectedUser1 ? 'selected' : ''
  //           }>${user.firstName} ${user.lastName}</option>`
  //       )}
  //     </select>
  //     <select id="user2" class="swal2-select" [(ngModel)]="selectedUser2" (ngModelChange)="updateDropdowns($event, 'user1')" required>
  //       <option value="" disabled selected>Choose a player</option>
  //       ${this.availableUsers
  //         .filter((user) => user !== this.selectedUser1)
  //         .map(
  //           (user) =>
  //             `<option value='${JSON.stringify(user)}' ${
  //               user === this.selectedUser2 ? 'selected' : ''
  //             }>${user.firstName} ${user.lastName}</option>`
  //         )}
  //     </select>
  //   `,
  //     focusConfirm: false,
  //     showCancelButton: true,
  //     confirmButtonText: 'Create Team',
  //     cancelButtonText: 'Cancel',
  //     preConfirm: () => {
  //       const teamName = (document.getElementById('teamName') as HTMLInputElement).value;
  //       const user1 = JSON.parse((document.getElementById('user1') as HTMLSelectElement).value);
  //       const user2 = JSON.parse((document.getElementById('user2') as HTMLSelectElement).value);
  
  //       if (!teamName || !user1 || !user2 || user1 === user2) {
  //         Swal.showValidationMessage('Please fill in all fields and ensure selected users are different.');
  //         return false;
  //       }
  
  //       return [teamName, user1, user2];
  //     },
  //   }).then((result: any) => {
  //     if (result.isConfirmed) {
  //       const [teamName, user1, user2] = result.value;
  //       const newTeam: Team = {
  //         teamId: this.teams.length + 1,
  //         teamName: teamName,
  //         users: [user1, user2],
  //       };
  
        
  //       this.userService.createTeam(newTeam);
  //       this.refreshTable();
  //       this.cdr.detectChanges();
  
  //     }
  //   }
  //   );
  // }


  // startGame(){
  //   console.log('startGame: ', event);
  // }


  onSelectPlayerOne(homeTeam: User, stepper: any){
    this.userOne = homeTeam;
    console.log('this.userOne: ', this.userOne);
    this.selectedUser1 = this.userOne.firstName +' '+ this.userOne.lastName;
    this.selectedUser2 = "";
    if (this.userTwo?.userId === this.userOne.userId ){
      this.userTwo = null;
    }
    console.log('selectedUser1: ', this.selectedUser1);
    this.filteredUserList = this.availablePlayers.filter(user => user.userId != this.userOne?.userId);
    //this.filterUserList();
    stepper.next();
  }
  
  onSelectPlayerTwo(awayTeam: User, stepper: any){
    this.userTwo = awayTeam;
    this.selectedUser2 = this.userTwo.firstName +' '+ this.userTwo.lastName;
    stepper.next();
  }

  
  onSelectHomeTeam(homeTeam: Team, teamStepper: any){
    this.teamOne = homeTeam;
    this.selectedTeam1 = this.teamOne.teamName;
    this.selectedTeam2 = "";
    if (this.teamTwo?.teamId === this.teamOne.teamId ){
      this.teamTwo = null;
    }
    this.filteredTeamList = this.availableTeams.filter(team => team.teamId != this.teamOne?.teamId);
    teamStepper.next();
  }
  
  onSelectAwayTeam(awayTeam: Team, teamStepper: any){
    this.teamTwo = awayTeam;
    this.selectedTeam2 = this.teamTwo.teamName;
    teamStepper.next();
  }

  setMessage(e:any){
    if(e.checked){
      this.message = 'Go in order'
    this.inOrder = true;
    }
    else {
      this.message = 'Slop counts'
    this.inOrder = false;
    }
  }

  enableStartGame(gameType:string){
    console.log('enableStartGame gameType: ', gameType);
    if(gameType ==='individual') {    
      this.dataService.setCricketOptions(gameType,2,[this.userOne.userId, this.userTwo.userId],this.inOrder,true,[],0);
const settings = this.dataService.getCurrentCricketOptions();
console.log('settings: ', settings);
this.router.navigate(['/games/cricket']);
}
    else if(gameType ==='team'){
      this.dataService.setCricketOptions(gameType,0,[],this.inOrder,true,[this.teamOne.teamId,this.teamTwo.teamId],2);
    }
  }

}
