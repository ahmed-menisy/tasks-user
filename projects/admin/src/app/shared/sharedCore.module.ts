import { NgOptimizedImage } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [NgOptimizedImage],
  exports: [
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    TranslateModule,
  ],
})
export class SharedModule {}
