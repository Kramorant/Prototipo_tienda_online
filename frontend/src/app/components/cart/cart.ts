import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { CartItem, CartService } from '../../services/cart.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-cart',
  imports: [
    RouterLink,
    FormsModule,
    CurrencyPipe,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  private readonly cartService = inject(CartService);
  private readonly apiService = inject(ApiService);
  private readonly authService = inject(AuthService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly router = inject(Router);
  private readonly currentUser = this.authService.getUser();

  readonly items = toSignal(this.cartService.items$, { initialValue: [] as CartItem[] });
  readonly total = computed(() =>
    this.items().reduce((sum, item) => sum + this.getUnitPrice(item) * item.quantity, 0)
  );
  shippingForm = {
    name: this.currentUser?.name ?? '',
    email: this.currentUser?.email ?? '',
    address: '',
    city: '',
    country: '',
    zip: '',
    phone: ''
  };

  getUnitPrice(item: CartItem): number {
    return item.sale_price ?? item.price;
  }

  removeItem(id: number): void {
    this.cartService.removeItem(id);
  }

  updateQuantity(id: number, quantity: number): void {
    const normalizedQuantity = Number(quantity);
    if (Number.isNaN(normalizedQuantity)) {
      return;
    }

    this.cartService.updateQuantity(id, normalizedQuantity);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  isShippingFormValid(): boolean {
    return Boolean(
      this.getTrimmedValue(this.shippingForm.name) &&
      this.getTrimmedValue(this.shippingForm.email) &&
      this.getTrimmedValue(this.shippingForm.address) &&
      this.getTrimmedValue(this.shippingForm.city) &&
      this.getTrimmedValue(this.shippingForm.country) &&
      this.getTrimmedValue(this.shippingForm.zip)
    );
  }

  confirmOrder(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    const currentItems = this.items();
    if (currentItems.length === 0) {
      return;
    }

    if (!this.isShippingFormValid()) {
      this.snackBar.open('Completa todos los campos requeridos de envío', 'Cerrar', {
        duration: 3000
      });
      return;
    }

    const payload = {
      items: currentItems.map((item) => ({
        product_id: item.id,
        quantity: item.quantity
      })),
      shipping_name: this.shippingForm.name,
      shipping_email: this.shippingForm.email,
      shipping_address: this.shippingForm.address,
      shipping_city: this.shippingForm.city,
      shipping_country: this.shippingForm.country,
      shipping_zip: this.shippingForm.zip,
      shipping_phone: this.shippingForm.phone,
      notes: ''
    };

    this.apiService.createOrder(payload).subscribe({
      next: () => {
        this.cartService.clearCart();
        this.snackBar.open('Pedido confirmado correctamente', 'Cerrar', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
      },
      error: () => {
        this.snackBar.open('No se pudo confirmar el pedido', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }

  private getTrimmedValue(value: string | null | undefined): string {
    return (value ?? '').trim();
  }
}
