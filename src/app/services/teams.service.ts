// // teams.service.ts
// import { Injectable } from '@angular/core';
// import { User } from 'src/app/models/user.model';
// import { Team } from 'src/app/models/team.model';

// @Injectable({
//   providedIn: 'root',
// })
// export class TeamService {
//   private teams: Team[] = [
//     { teamId: 1, teamName: 'DonnyBrooks',users: [{ userId: 1, firstName: 'Gabe', lastName: 'Altenhofen',email: 'heyitsgabe@hotmail.com' },
//     { userId: 2, firstName: 'Luke', lastName: 'Lorenz',email: 'lukelorenz@hotmail.com' }] },
//     { teamId: 2, teamName: 'Merica', users: [{ userId: 3, firstName: 'Paul', lastName: 'Loftis',email: 'paulloftis@hotmail.com' },
//     { userId: 4, firstName: 'Bryan', lastName: 'Swalley',email: 'bryanswalley@hotmail.com' }] },
//   ];

//   getTeams(): Team[] {
//     return this.teams;
//   }

//   createTeam(newTeam: Team): void {
//     this.teams.push(newTeam);
//     console.log('service   teams: ', this.teams);
//   }
// }
