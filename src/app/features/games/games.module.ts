import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesRoutingModule as GamesRoutingModule } from './games-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { GameListComponent as GameListComponent } from './game-list/game-list.component';
import { CricketComponent } from './cricket/cricket.component';

@NgModule({
    imports: [
        CommonModule,
        GamesRoutingModule,
        SharedModule,
        MatGridListModule
    ],
    declarations: [
        GameListComponent,
        CricketComponent
    ]
})
export class GamesModule { }
