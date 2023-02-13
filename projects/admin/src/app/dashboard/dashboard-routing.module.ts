import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'users',
        loadChildren: () =>
          import('./manage-users/manage-users.module').then(
            (m) => m.ManageUsersModule
          ),
      },
      {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full',
      },
      {
        path: 'tasks',
        loadChildren: () =>
          import('./tasks-admin/tasks-admin.module').then(
            (m) => m.TasksAdminModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
