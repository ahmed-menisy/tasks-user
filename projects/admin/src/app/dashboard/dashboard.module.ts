import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, DashboardRoutingModule, TranslateModule],
})
export class DashboardModule {}
