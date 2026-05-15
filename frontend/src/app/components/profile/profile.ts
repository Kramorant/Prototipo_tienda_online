import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

interface OrderItem {
  product_name: string;
  quantity: number;
  price: string;
  subtotal: string;
}

interface Order {
  id: number;
  order_number: string;
  status: string;
  subtotal: string;
  shipping_cost: string;
  total: string;
  created_at: string;
  items: OrderItem[];
}

@Component({
  selector: 'app-profile',
  imports: [
    AsyncPipe,
    RouterLink,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile implements OnInit {
  private readonly apiService = inject(ApiService);
  readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  user: any = this.authService.getUser();
  orders: Order[] = [];
  loadingUser = true;
  loadingOrders = true;
  selectedOrder: Order | null = null;
  activeTab: 'profile' | 'orders' = 'profile';

  ngOnInit(): void {
    this.apiService.getMe().subscribe({
      next: (user) => {
        this.user = user;
        this.authService.saveUser(user);
        this.loadingUser = false;
      },
      error: () => {
        this.loadingUser = false;
      }
    });

    this.apiService.getOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.loadingOrders = false;
      },
      error: () => {
        this.orders = [];
        this.loadingOrders = false;
      }
    });
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'pending':
        return 'Pendiente';
      case 'processing':
        return 'Procesando';
      case 'shipped':
        return 'Enviado';
      case 'delivered':
        return 'Entregado';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'delivered':
        return 'primary';
      case 'pending':
      case 'processing':
      case 'shipped':
        return 'accent';
      case 'cancelled':
        return 'warn';
      default:
        return '';
    }
  }

  selectOrder(order: Order): void {
    this.selectedOrder = this.selectedOrder?.id === order.id ? null : order;
  }

  closeOrderDetail(): void {
    this.selectedOrder = null;
  }

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
}
