import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../core/environments/environment';

@Injectable()
export class LoginService {
  constructor(private _HttpClient: HttpClient) {}

  createAccount(obj: object): Observable<any> {
    return this._HttpClient.post(
      environment.baseApi + 'auth/createAccount',
      obj
    );
  }

  logIn(obj: Object): Observable<any> {
    return this._HttpClient.post(environment.baseApi + 'auth/login', obj);
  }
}
