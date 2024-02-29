import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { HTTP_INTERCEPTORS, HttpBackend, HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { HttpErrorInterceptor  } from './token-http-interceptor';


export const appConfig: ApplicationConfig = {
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true,
  },
    provideRouter(routes),
    provideAnimations(),
    // provideHttpClient(HTTP_INTERCEPTORS),
    provideHttpClient(withFetch()),
    provideToastr()
  ],
};
