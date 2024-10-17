import { HttpInterceptorFn } from '@angular/common/http';
import { SpinnerService } from './services/spinner.service';
import { inject } from '@angular/core';
import { catchError, EMPTY, finalize } from 'rxjs';
import { AuthService } from './services/auth.service';

export const spinnerInterceptor: HttpInterceptorFn = (request, next) => {
  if (request.url.includes('like') || request.url.includes('dislike'))
    return next(request);

  const spinnerService = inject(SpinnerService);

  spinnerService.showSpinner();

  return next(request).pipe(finalize(() => spinnerService.hideSpinner()));
};

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService);

  return next(request).pipe(
    catchError((err) => {
      if (err.status === 403) {
        authService.logoutFromClient();
      }
      return EMPTY;
    }),
  );
};
