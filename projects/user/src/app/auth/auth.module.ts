import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SharedModule } from '../core/shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { LayoutComponent } from './layout/layout.component';
import { SharedcoreModule } from '../core/shared/sharedcore.module';
import { LoginService } from './services/login.service';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, LayoutComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    MaterialModule,
    SharedcoreModule,
  ],
  providers: [LoginService],
})
export class AuthModule {}
