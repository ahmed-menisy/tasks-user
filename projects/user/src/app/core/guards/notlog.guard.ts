import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotlogGuard implements CanActivate {
  constructor(private _Router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const tokenUser = JSON.parse(localStorage.getItem('_Data')!);
    if (tokenUser?.token) {
      this._Router.navigate(['/tasks']);
      return false;
    } else {
      return true;
    }
  }
}
