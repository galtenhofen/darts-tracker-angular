import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { DataService } from 'src/app/services/data.service';
import { NGXLogger } from 'ngx-logger';
import { Title } from '@angular/platform-browser';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort;

  constructor(
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title,
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Games');
    this.logger.log('Games loaded');
    this.notificationService.openSnackBar('Games loaded');

  }

  chooseGame(gameName:string){
    this.dataService.setGame(gameName);
    this.router.navigate(['/games/cricket/options']);
  }
}
