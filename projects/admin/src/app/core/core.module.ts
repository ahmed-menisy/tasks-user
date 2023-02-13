import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { interceptor } from './interceptors';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [interceptor],
})
export class CoreModule {}
