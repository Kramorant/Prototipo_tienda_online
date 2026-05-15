import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { finalize } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private readonly apiService = inject(ApiService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  email = '';
  password = '';
  hidePassword = true;
  loading = false;
  error = '';

  onSubmit() {
    this.error = '';
    this.loading = true;

    this.apiService
      .login({ email: this.email, password: this.password })
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (res) => {
          this.authService.saveToken(res.token);
          this.authService.saveUser(res.user);
          this.authService.setLoggedIn(true);
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.error = err?.error?.message ?? 'No se pudo iniciar sesión. Verifica tus credenciales.';
        }
      });
  }
}
