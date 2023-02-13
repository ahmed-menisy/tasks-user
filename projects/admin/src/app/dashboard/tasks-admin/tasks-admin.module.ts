import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../../shared/sharedCore.module';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { TasksService } from './services/tasks.service';

import { TasksAdminRoutingModule } from './tasks-admin-routing.module';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';

@NgModule({
  declarations: [AddTaskComponent, ListTasksComponent, ConfirmationComponent],
  imports: [
    CommonModule,
    TasksAdminRoutingModule,
    MaterialModule,
    SharedModule,
    SweetAlert2Module.forRoot(),
  ],
  providers: [TasksService],
})
export class TasksAdminModule {}
