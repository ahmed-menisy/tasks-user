import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';

const routes: Routes = [
  { path: '', component: ListTasksComponent, title: 'Tasks' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksAdminRoutingModule {}
