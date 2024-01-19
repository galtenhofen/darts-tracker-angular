import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/users.service';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { User, UserImpl } from 'src/app/models/user.model';
import { NGXLogger } from 'ngx-logger';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  displayedColumns: string[] = ['userId', 'name', 'email', 'actions'];
  dataSource = new MatTableDataSource<User>();
  userList: User[] = [];
  filteredUserList: User[] = [];

  

  constructor(
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title,
    private usersService: UserService
  ) { }

  ngOnInit() {
    this.filteredUserList = this.userList.slice();
    this.titleService.setTitle('Users');
    this.logger.log('Users loaded');
    this.refreshTable();
  }

  refreshTable(): void {
    this.userList = this.usersService.getUsers();
    this.dataSource.data = this.userList;
  }

  addUser(): void {
    const newUser: User = {
      userId: this.dataSource.data.length + 1,
      firstName: 'New',
      lastName: 'User',
      email: 'new.user@example.com',
    };

    this.usersService.addUser(newUser);
    this.refreshTable();
  }

  deleteUser(userId: number): void {
    this.usersService.deleteUser(userId);
    this.refreshTable();
  }


 
}
