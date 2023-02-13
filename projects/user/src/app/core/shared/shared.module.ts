import { NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ErrorhandleDirective } from '../errorhandle.directive';

@NgModule({
  declarations: [ErrorhandleDirective],
  imports: [TranslateModule.forChild({ extend: true }), NgOptimizedImage],
  exports: [TranslateModule, NgOptimizedImage, ErrorhandleDirective],
})
export class SharedModule {}
