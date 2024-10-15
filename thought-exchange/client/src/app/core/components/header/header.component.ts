import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, UpperCasePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private authServce = inject(AuthService);

  currentUser = this.authServce.currentUser;

  isDropdownOpen = signal(false);

  toggleDropdown() {
    this.isDropdownOpen.update((prev) => !prev);
  }

  onLogoutClick() {
    this.authServce.logoutFromClient();
    this.authServce.logoutFromServer();
  }
}
