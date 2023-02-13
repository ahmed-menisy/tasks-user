import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [],
  exports: [ReactiveFormsModule, FormsModule, HttpClientModule],
})
export class SharedcoreModule {}
