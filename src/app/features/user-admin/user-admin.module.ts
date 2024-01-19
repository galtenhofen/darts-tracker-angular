import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './user-admin-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserAdminComponent } from './user-admin/user-admin.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule
  ],
  declarations: [UserAdminComponent]
})
export class UserAdminModule { }
