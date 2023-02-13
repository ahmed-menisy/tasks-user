import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/sharedCore.module';
import { LoginService } from './services/login.service';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, AuthRoutingModule, SharedModule, MaterialModule],
  providers: [LoginService],
})
export class AuthModule {}
