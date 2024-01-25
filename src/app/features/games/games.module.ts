import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesRoutingModule as GamesRoutingModule } from './games-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
//import { MatGridListModule } from '@angular/material/grid-list';
import { CustomMaterialModule } from 'src/app/custom-material/custom-material.module';
import { CricketComponent } from './cricket/cricket.component';
import { GameContainerComponent } from './game-container/game-container.component';
import { StartOptionsComponent } from 'src/app/shared/start-options/start-options.component';
import { UserListComponent } from 'src/app/shared/users/user-list.component';
import { TeamComponent } from 'src/app/shared/teams/team.component';
import { CricketStatsComponent } from './cricket/cricket-stats/cricket-stats.component';
import { CricketButtonsComponent } from './cricket/cricket-buttons/cricket-buttons.component';

@NgModule({
    imports: [
        CommonModule,
        GamesRoutingModule,
        SharedModule,
       // MatGridListModule,
        CustomMaterialModule
    ],
    declarations: [
        CricketComponent,
        GameContainerComponent,
        CricketStatsComponent,
        CricketButtonsComponent
    ]
})
export class GamesModule { }
