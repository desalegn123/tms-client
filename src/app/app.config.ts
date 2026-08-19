// import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
// import { provideAnimations } from '@angular/platform-browser/animations';
// import { provideRouter, withComponentInputBinding } from '@angular/router';
// import { provideHttpClient } from '@angular/common/http';
// import { routes } from './app.routes';
// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideZoneChangeDetection({ eventCoalescing: true }),
//     provideRouter(routes, withComponentInputBinding()),
//     provideHttpClient(),
//     provideAnimations(),
//   ],
// };
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';

import { provideAnimations } from '@angular/platform-browser/animations';

import { provideRouter, withComponentInputBinding } from '@angular/router';

import { provideHttpClient, withInterceptors, withXsrfConfiguration } from '@angular/common/http';

import { routes } from './app.routes';

import { credentialsInterceptor } from './interceptors/credentials.interceptor';
import { errorInterceptor } from './interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // Angular change detection configuration
    provideZoneChangeDetection({
      eventCoalescing: true,
    }),

    // Application routes
    provideRouter(routes, withComponentInputBinding()),

    // HTTP client + credentials + XSRF protection
    provideHttpClient(
      // Automatically sends cookies with HTTP requests
      withInterceptors([credentialsInterceptor, errorInterceptor]),

      // Angular XSRF configuration
      withXsrfConfiguration({
        cookieName: 'XSRF-TOKEN',
        headerName: 'X-XSRF-TOKEN',
      }),
    ),

    // Angular animations
    provideAnimations(),
  ],
};
