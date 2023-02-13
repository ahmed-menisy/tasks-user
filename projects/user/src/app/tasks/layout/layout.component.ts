import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  constructor(private _Router: Router) {}

  logOut(): void {
    localStorage.removeItem('_Data');
    this._Router.navigate(['/login']);
  }
}
