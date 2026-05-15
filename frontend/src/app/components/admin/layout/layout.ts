import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatSidenavModule, MatListModule, MatIconModule, MatToolbarModule, MatButtonModule],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class AdminLayout {
  private readonly api = inject(ApiService);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  logout(): void {
    this.api.logout().subscribe({
      next: () => this.completeLogout(),
      error: () => this.completeLogout()
    });
  }

  private completeLogout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
