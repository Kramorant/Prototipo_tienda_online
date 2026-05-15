import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSnackBarModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {
  name = '';
  email = '';
  message = '';

  constructor(private snackBar: MatSnackBar) {}

  onSubmit() {
    this.snackBar.open('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'Cerrar', {
      duration: 4000,
      panelClass: ['success-snackbar']
    });
    this.name = '';
    this.email = '';
    this.message = '';
  }
}