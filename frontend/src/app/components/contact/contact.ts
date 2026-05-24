import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-contact',
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {
  name = '';
  email = '';
  message = '';
  isSubmitting = false;

  constructor(
    private snackBar: MatSnackBar,
    private apiService: ApiService
  ) {}

  onSubmit() {
    if (!this.name || !this.email || !this.message) {
      this.snackBar.open('Por favor, completa todos los campos.', 'Cerrar', {
        duration: 3000
      });
      return;
    }

    this.isSubmitting = true;

    this.apiService.sendContact({
      name: this.name,
      email: this.email,
      message: this.message
    }).subscribe({
      next: () => {
        this.snackBar.open('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'Cerrar', {
          duration: 4000,
          panelClass: ['success-snackbar']
        });

        this.name = '';
        this.email = '';
        this.message = '';
        this.isSubmitting = false;
      },
      error: () => {
        this.snackBar.open('Error al enviar el mensaje. Inténtalo de nuevo.', 'Cerrar', {
          duration: 4000,
          panelClass: ['error-snackbar']
        });
        this.isSubmitting = false;
      }
    });
  }
}