import { Component, OnInit, inject } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-admin-orders',
  imports: [
    SlicePipe,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './orders.html',
  styleUrl: './orders.scss'
})
export class AdminOrders implements OnInit {
  private readonly api = inject(ApiService);
  private readonly snackBar = inject(MatSnackBar);

  orders: any[] = [];
  loading = true;
  displayedColumns = ['id', 'order_number', 'user', 'total', 'status', 'date', 'actions'];
  statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading = true;
    this.api.getAdminOrders().subscribe({
      next: (data) => {
        this.orders = data.data ?? data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('Error al cargar pedidos.', 'Cerrar', { duration: 3000 });
      }
    });
  }

  updateStatus(order: any): void {
    this.api.updateOrderStatus(order.id, order.status).subscribe({
      next: () => this.snackBar.open('Estado actualizado.', 'Cerrar', { duration: 3000 }),
      error: () => this.snackBar.open('Error al actualizar estado.', 'Cerrar', { duration: 3000 })
    });
  }
}
