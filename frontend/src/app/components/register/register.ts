import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register',
  imports: [RouterLink, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  hidePassword = true;

  onSubmit() {
    console.log('Register:', this.name, this.email);
  }
}