// teams.component.ts
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Team } from 'src/app/models/team.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
})
export class TeamComponent implements OnInit {
  teams: Team[] = [];
  availableUsers: User[] = [];
  selectedUser1: User | undefined = undefined;
  selectedUser2: User | undefined = undefined;
  displayedColumns: string[] = ['teamId', 'teamName', 'users'];
  isCreateTeamPanelOpen: boolean = false; 
  newTeamName: string = ''; 
  dataSource = new MatTableDataSource<Team>();

  constructor( private userService: UserService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
   this.refreshTable();
  }

  refreshTable(): void {
    this.availableUsers = this.userService.getUsers();
    this.teams = this.userService.getTeams();
    this.dataSource.data = this.teams;
  }

  openCreateTeamDialog(): void {
  Swal.fire({
    title: 'Create New Team',
    html: `
    <input id="teamName" class="swal2-input" placeholder="Team Name" value="${this.newTeamName}" required>
    <select id="user1" class="swal2-select" [(ngModel)]="selectedUser1" (ngModelChange)="updateDropdowns($event, 'user2')" required>
      <option value="" disabled selected>Choose a player</option>
      ${this.availableUsers.map(
        (user) =>
          `<option value='${JSON.stringify(user)}' ${
            user === this.selectedUser1 ? 'selected' : ''
          }>${user.firstName} ${user.lastName}</option>`
      )}
    </select>
    <select id="user2" class="swal2-select" [(ngModel)]="selectedUser2" (ngModelChange)="updateDropdowns($event, 'user1')" required>
      <option value="" disabled selected>Choose a player</option>
      ${this.availableUsers
        .filter((user) => user !== this.selectedUser1)
        .map(
          (user) =>
            `<option value='${JSON.stringify(user)}' ${
              user === this.selectedUser2 ? 'selected' : ''
            }>${user.firstName} ${user.lastName}</option>`
        )}
    </select>
  `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Create Team',
    cancelButtonText: 'Cancel',
    preConfirm: () => {
      const teamName = (document.getElementById('teamName') as HTMLInputElement).value;
      const user1 = JSON.parse((document.getElementById('user1') as HTMLSelectElement).value);
      const user2 = JSON.parse((document.getElementById('user2') as HTMLSelectElement).value);

      if (!teamName || !user1 || !user2 || user1 === user2) {
        Swal.showValidationMessage('Please fill in all fields and ensure selected users are different.');
        return false;
      }

      return [teamName, user1, user2];
    },
  }).then((result: any) => {
    if (result.isConfirmed) {
      const [teamName, user1, user2] = result.value;
      const newTeam: Team = {
        teamId: this.teams.length + 1,
        teamName: teamName,
        users: [user1, user2],
      };

      
      this.userService.createTeam(newTeam);
      this.refreshTable();
      this.cdr.detectChanges();

    }
  }
  );
}

updateDropdowns(selectedUser: User | undefined, targetDropdown: string): void {
  console.log('updateDropdowns: ', targetDropdown);
  if (targetDropdown === 'user1') {
    this.availableUsers = this.availableUsers.filter((user) => user !== this.selectedUser2);
  } else if (targetDropdown === 'user2') {
    this.availableUsers = this.availableUsers.filter((user) => user !== this.selectedUser1);
  }
}


  // createTeam(): void {
  //   if (this.newTeamName && this.selectedUser1 && this.selectedUser2) {
  //     const newTeam: Team = {
  //       teamId: this.teams.length + 1,
  //       teamName: this.newTeamName,
  //       users: [this.selectedUser1, this.selectedUser2],
  //     };
  
  //     this.teamsService.createTeam(newTeam);
  //     this.teams = this.teamsService.getTeams();
  //     this.selectedUser1 = undefined;
  //     this.selectedUser2 = undefined;
  //     this.newTeamName = ''; // Clear the input field
  //     this.isCreateTeamPanelOpen = false; // Optionally, close the expansion panel
  //   } else {
  //     console.error('Please provide a team name and select two users to create a team.');
  //   }
  // }
}
