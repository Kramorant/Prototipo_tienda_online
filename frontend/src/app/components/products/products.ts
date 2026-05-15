import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-products',
  imports: [RouterLink, MatCardModule, MatButtonModule, MatChipsModule, MatProgressSpinnerModule, MatSnackBarModule],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class Products implements OnInit {
  products: any[] = [];
  loading = true;
  error = '';

  constructor(
    private api: ApiService,
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.api.getProducts().subscribe({
      next: (res: any) => {
        this.products = res.data ?? res;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Error al cargar los productos';
        this.loading = false;
        console.error(err);
      }
    });
  }

  addToCart(product: any): void {
    this.cartService.addItem(product);
    this.snackBar.open('Producto añadido al carrito', 'Cerrar', {
      duration: 2500,
      panelClass: ['success-snackbar']
    });
  }
}
