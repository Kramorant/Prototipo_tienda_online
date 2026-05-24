import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-register',
  imports: [
    RouterLink,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  private readonly api = inject(ApiService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  hidePassword = true;
  hideConfirmPassword = true;
  loading = false;

  onSubmit() {
    if (!this.name.trim() || !this.email.trim() || !this.password || !this.confirmPassword) {
      this.snackBar.open('Completa todos los campos.', 'Cerrar', { duration: 3000 });
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.snackBar.open('Las contraseñas no coinciden.', 'Cerrar', { duration: 3000 });
      return;
    }

    this.loading = true;

    this.api.register({
      name: this.name.trim(),
      email: this.email.trim(),
      password: this.password,
      password_confirmation: this.confirmPassword
    }).subscribe({
      next: () => {
        this.loading = false;
        this.snackBar.open('Cuenta creada correctamente. Ahora puedes iniciar sesión.', 'Cerrar', {
          duration: 4000
        });
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.loading = false;

        const message =
          error?.error?.message ||
          error?.error?.errors?.email?.[0] ||
          error?.error?.errors?.password?.[0] ||
          'Error al crear la cuenta.';

        this.snackBar.open(message, 'Cerrar', { duration: 4000 });
      }
    });
  }
}