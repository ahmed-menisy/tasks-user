import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './error.interceptor';
import { HttprequestInterceptor } from './httprequest.interceptor';
import { LoadingInterceptor } from './loading.interceptor';

export const interceptors = [
  { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: HttprequestInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
];
