import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';

import { GameListComponent } from './game-list/game-list.component';
import { CricketComponent } from './cricket/cricket.component';

const routes: Routes = [
  // {
  //   path: 'games',
  //   component: LayoutComponent,
  //   children: [
  //     { path: 'cricket', component: CricketComponent },
  //   ]
  // },
  {
    path: '',
    component: LayoutComponent,
    children: [
     { path: 'cricket', component: CricketComponent },
      { path: '', component: GameListComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
