import {
  Component,
  ElementRef,
  inject,
  Renderer2,
  signal,
  viewChild,
} from '@angular/core';
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
  private renderer = inject(Renderer2);

  dropdownEl = viewChild<ElementRef>('dropdown');

  currentUser = this.authServce.currentUser;

  isDropdownOpen = signal(false);

  ngAfterViewInit() {
    this.renderer.listen(document, 'click', (e) => {
      if (!this.dropdownEl().nativeElement.contains(e.target)) {
        this.isDropdownOpen.set(false);
      }
    });
  }

  toggleDropdown() {
    this.isDropdownOpen.update((prev) => !prev);
  }

  onLogoutClick() {
    this.authServce.logoutFromClient();
    this.authServce.logoutFromServer();
  }
}
