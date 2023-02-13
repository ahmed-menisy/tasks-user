import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageUsersRoutingModule } from './manage-users-routing.module';
import { UsersComponent } from './components/users/users.component';
import { UsersService } from './services/users.service';
import { MaterialModule } from '../../material/material.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SharedModule } from '../../shared/sharedCore.module';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    ManageUsersRoutingModule,
    MaterialModule,
    SharedModule,
    SweetAlert2Module,
  ],
  providers: [UsersService],
})
export class ManageUsersModule {}
