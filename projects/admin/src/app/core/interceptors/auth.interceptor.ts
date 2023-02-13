import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // headers: request.headers.append(
    //   'Authorization',
    //   `Bearer ${JSON.parse(localStorage.getItem('_uData')!)?.token}`
    // ),
    request = request.clone({
      headers: request.headers.append(
        'Authorization',
        `Bearer ${JSON.parse(localStorage.getItem('_uData')!)?.token}`
      ),
    });

    return next.handle(request);
  }
}
