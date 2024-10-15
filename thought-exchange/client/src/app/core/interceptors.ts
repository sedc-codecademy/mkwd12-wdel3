import { HttpInterceptorFn } from '@angular/common/http';
import { SpinnerService } from './services/spinner.service';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

export const spinnerInterceptor: HttpInterceptorFn = (request, next) => {
  const spinnerService = inject(SpinnerService);

  spinnerService.showSpinner();

  return next(request).pipe(finalize(() => spinnerService.hideSpinner()));
};
