import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';

interface ProductImage {
  id: number;
  image: string;
  order: number;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  sale_price: number | null;
  stock: number;
  sku: string;
  main_image: string | null;
  scale: string | null;
  condition: string;
  release_date: string | null;
  featured: boolean;
  active: boolean;
  category: { id: number; name: string } | null;
  images: ProductImage[];
}

@Component({
  selector: 'app-product-detail',
  imports: [
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss'
})
export class ProductDetail implements OnInit {
  product: Product | null = null;
  loading = true;
  error = false;
  selectedImage: string | null = null;
  allImages: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private cartService: CartService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.apiService.getProduct(id).subscribe({
      next: (res: any) => {
        if (res && res.data && res.data.id) {
          this.product = res.data;
          this.buildGallery();
        } else if (res && res.id) {
          this.product = res;
          this.buildGallery();
        } else {
          this.error = true;
        }
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  getConditionLabel(condition: string): string {
    const labels: Record<string, string> = {
      'new': 'Nuevo',
      'used': 'Usado',
      'pre-order': 'Pre-orden'
    };
    return labels[condition] ?? condition;
  }

  selectImage(url: string): void {
    this.selectedImage = url;
  }

  buildGallery(): void {
    if (!this.product) {
      this.allImages = [];
      this.selectedImage = null;
      return;
    }

    const sortedImages = [...(this.product.images ?? [])]
      .sort((a, b) => a.order - b.order)
      .map((item) => item.image);

    const candidateImages = [this.product.main_image, ...sortedImages];
    this.allImages = [...new Set(candidateImages.filter((image): image is string => typeof image === 'string' && image.length > 0))];
    this.selectedImage = this.allImages[0] ?? null;
  }

  addToCart(): void {
    if (!this.product) {
      return;
    }

    this.cartService.addItem(this.product);
    this.snackBar.open('Producto añadido al carrito', 'Cerrar', {
      duration: 2500,
      panelClass: ['success-snackbar']
    });
  }

  buyNow(): void {
    if (!this.product) {
      return;
    }

    this.cartService.addItem(this.product);
    this.router.navigate(['/cart']);
  }
}
