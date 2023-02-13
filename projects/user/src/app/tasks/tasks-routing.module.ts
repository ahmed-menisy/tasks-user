import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { TasksComponent } from './components/tasks-list/tasks.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: TasksComponent, title: 'Tasks' },
      { path: ':id', component: TaskDetailsComponent, title: 'Task Details' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule {}
