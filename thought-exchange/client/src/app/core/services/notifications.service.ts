import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private toastrService = inject(ToastrService);

  showSuccess(msg: string) {
    this.toastrService.success(msg);
  }

  showError(msg: string) {
    this.toastrService.error(msg);
  }
}
