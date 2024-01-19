import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameListComponent } from '../games/game-list/game-list.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [DashboardHomeComponent,GameListComponent],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        SharedModule
    ]
})
export class DashboardModule { }
