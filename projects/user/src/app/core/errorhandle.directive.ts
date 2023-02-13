import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appErrorhandle]',
})
export class ErrorhandleDirective {
  constructor(private _ElementRef: ElementRef) {}

  @HostListener('error')
  updateUrl(): void {
    this._ElementRef.nativeElement.src = './assets/download.jfif';
  }
}
