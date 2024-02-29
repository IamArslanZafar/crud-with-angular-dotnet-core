import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('Intercepting Request:', request);

    return next.handle(request)
      .pipe(
        catchError((err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.error instanceof Error) {
              // A client-side or network error occurred. Handle it accordingly.
              console.error('An error occurred:', err.error.message);
            } else {
              // The backend returned an unsuccessful response code.
              // The response body may contain clues as to what went wrong,
              console.error(`Backend returned code ${err.status}, body was: ${err.error}`);
            }
          } else {
            // Handle other types of errors
            console.error('An unexpected error occurred:', err);
          }

          // Throw the error so it can be caught by the caller
          return throwError(err);
        })
      );
  }
}
