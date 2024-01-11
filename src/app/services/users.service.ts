
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [
    { userId: 1, firstName: 'Gabe', lastName: 'Altenhofen',email: 'heyitsgabe@hotmail.com' },
    { userId: 2, firstName: 'Luke', lastName: 'Lorenz',email: 'lukelorenz@hotmail.com' },
    { userId: 3, firstName: 'Paul', lastName: 'Loftis',email: 'paulloftis@hotmail.com' },
    { userId: 4, firstName: 'Bryan', lastName: 'Swalley',email: 'bryanswalley@hotmail.com' }
  ];

  getUsers(): User[] {
    return this.users;
  }

  addUser(user: User): void {
    this.users.push(user);
  }

  deleteUser(userId: number): void {
    this.users = this.users.filter((user) => user.userId !== userId);
  }
}
