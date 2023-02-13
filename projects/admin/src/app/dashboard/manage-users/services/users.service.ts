import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../env/environment';

@Injectable()
export class UsersService {
  constructor(private _HttpClient: HttpClient) {}

  getAllUsers(obj: any): Observable<any> {
    let params = new HttpParams();
    params = params.appendAll(obj);
    return this._HttpClient.get(environment.baseAuth + `auth/users`, {
      params,
    });
  }

  deleteUser(id: string): Observable<any> {
    return this._HttpClient.delete(environment.baseAuth + `auth/user/${id}`);
  }

  changeStatus(obj: object): Observable<any> {
    return this._HttpClient.put(environment.baseAuth + 'auth/user-status', obj);
  }
}
