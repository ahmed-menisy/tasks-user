import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../core/shared/shared.module';

import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { TasksComponent } from './components/tasks-list/tasks.component';
import { LayoutComponent } from './layout/layout.component';
import { TasksRoutingModule } from './tasks-routing.module';
import { TasksService } from './services/tasks.service';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [TasksComponent, TaskDetailsComponent, LayoutComponent],
  imports: [
    CommonModule,
    TasksRoutingModule,
    SharedModule,
    MaterialModule,
    NgxPaginationModule,
  ],
  providers: [TasksService],
})
export class TasksModule {}
