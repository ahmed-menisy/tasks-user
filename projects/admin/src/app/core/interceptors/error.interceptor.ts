import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private _ToastrService: ToastrService,
    private _Router: Router,
    private _Injector: Injector
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        const _translate = this._Injector.get(TranslateService);

        this._ToastrService.error(
          err.error.message,
          _translate.instant('toaster.titleError') + ` ${err.status}`
        );

        if (
          err.error.message === 'jwt expired' ||
          err.error.message === 'jwt malformed'
        ) {
          localStorage.removeItem('_uData');
          this._Router.navigate(['/login']);
        }

        return throwError(() => err);
      })
    );
  }
}
