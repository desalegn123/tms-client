import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      // Extract the RFC 7807 ProblemDetails "detail" property
      const detailMessage = err.error?.detail ?? 'A system error occurred. Please try again.';

      if (err.status === 401) {
        // User is not authenticated or the session has expired
        router.navigate(['/login']);
      } else {
        // Show the server's structured error message
        console.error('API Error Response:', detailMessage);
      }

      // Send the error forward to the original caller
      return throwError(() => err);
    }),
  );
};
