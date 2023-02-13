import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private _ToastrService: ToastrService, private _Router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        this._ToastrService.error(err.error.message, `Error ${err.status}`);

        if (
          err.error.message === 'jwt expired' ||
          err.error.message === 'jwt malformed'
        ) {
          localStorage.removeItem('_Data');
          this._Router.navigate(['/login']);
        }

        return throwError(() => err);
      })
    );
  }
}
