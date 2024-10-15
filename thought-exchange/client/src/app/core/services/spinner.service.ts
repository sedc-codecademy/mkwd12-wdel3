import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  spinner = signal(false);

  showSpinner() {
    this.spinner.set(true);
  }

  hideSpinner() {
    this.spinner.set(false);
  }
}
