import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './core/guards/login.guard';
import { NotlogGuard } from './core/guards/notlog.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [NotlogGuard],
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'tasks',
    canActivate: [LoginGuard],
    loadChildren: () =>
      import('./tasks/tasks.module').then((m) => m.TasksModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
