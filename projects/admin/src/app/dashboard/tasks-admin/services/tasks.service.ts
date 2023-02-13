import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../env/environment';

@Injectable()
export class TasksService {
  constructor(private _HttpClient: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this._HttpClient.get(environment.baseAuth + `auth/users`);
  }

  getAllTasks(obj: any): Observable<any> {
    let params = new HttpParams();

    params = params.appendAll(obj);

    return this._HttpClient.get(environment.baseAuth + `tasks/all-tasks`, {
      params,
    });
  }

  createTask(obj: any): Observable<any> {
    return this._HttpClient.post(environment.baseAuth + `tasks/add-task`, obj);
  }

  updateTask(obj: any, id: string): Observable<any> {
    return this._HttpClient.put(
      environment.baseAuth + `tasks/edit-task/${id}`,
      obj
    );
  }

  deleteTask(id: string): Observable<any> {
    return this._HttpClient.delete(
      environment.baseAuth + `tasks/delete-task/${id}`
    );
  }
}
