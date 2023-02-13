import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../core/environments/environment';

@Injectable()
export class TasksService {
  constructor(private _HttpClient: HttpClient) {}

  getTasks(obj: any, id: string): Observable<any> {
    let params = new HttpParams();
    params = params.appendAll(obj);

    return this._HttpClient.get(
      environment.baseApi + `tasks/user-tasks/${id}`,
      {
        params,
      }
    );
  }

  getDetailsTask(id: string): Observable<any> {
    return this._HttpClient.get(environment.baseApi + `tasks/task/${id}`);
  }

  completeTask(obj: object): Observable<any> {
    return this._HttpClient.put(environment.baseApi + 'tasks/complete', obj);
  }
}
