import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { StartOptionsComponent } from 'src/app/shared/start-options/start-options.component';
import { GameContainerComponent } from './game-container/game-container.component';
import { CricketComponent } from './cricket/cricket.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'cricket/options', component: StartOptionsComponent },
     { path: 'cricket', component: CricketComponent },
      { path: '', component: GameContainerComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
