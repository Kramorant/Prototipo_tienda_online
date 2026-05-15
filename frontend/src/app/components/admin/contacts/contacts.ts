import { Component, OnInit, inject } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-admin-contacts',
  imports: [SlicePipe, MatTableModule, MatProgressSpinnerModule, MatSnackBarModule],
  templateUrl: './contacts.html',
  styleUrl: './contacts.scss'
})
export class AdminContacts implements OnInit {
  private readonly api = inject(ApiService);
  private readonly snackBar = inject(MatSnackBar);

  contacts: any[] = [];
  loading = true;
  displayedColumns = ['id', 'name', 'email', 'message', 'read', 'date'];

  ngOnInit(): void {
    this.api.getAdminContacts().subscribe({
      next: (data) => {
        this.contacts = data.data ?? data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('Error al cargar mensajes.', 'Cerrar', { duration: 3000 });
      }
    });
  }
}
