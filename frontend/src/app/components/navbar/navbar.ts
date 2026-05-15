import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { CartService } from '../../services/cart.service';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, AsyncPipe, MatToolbarModule, MatButtonModule, MatIconModule, MatBadgeModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  private readonly apiService = inject(ApiService);
  readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly cartService = inject(CartService);
  readonly isLoggedIn$ = this.authService.isLoggedIn$;
  readonly userName = toSignal(this.isLoggedIn$.pipe(map((isLoggedIn) => this.getUserName(isLoggedIn))), { initialValue: '' });
  readonly itemCount = toSignal(
    this.cartService.items$.pipe(map((items) => items.reduce((sum, item) => sum + item.quantity, 0))),
    { initialValue: 0 }
  );

  logout(): void {
    this.apiService.logout().subscribe({
      next: () => this.completeLogout(),
      error: () => this.completeLogout()
    });
  }

  private completeLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  private getUserName(isLoggedIn: boolean): string {
    if (!isLoggedIn) {
      return '';
    }
    return this.authService.getUser()?.name ?? '';
  }
}
