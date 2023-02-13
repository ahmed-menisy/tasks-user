import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../env/environment';
import { formLogin } from '../../core/interfaces/interfaces';

@Injectable()
export class LoginService {
  constructor(private _Http: HttpClient) {}

  setLogin(obj: formLogin): Observable<any> {
    return this._Http.post(environment.baseAuth + 'auth/login', obj);
  }
}
