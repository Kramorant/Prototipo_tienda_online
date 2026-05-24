import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-admin-products',
  imports: [
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatCardModule,
    MatDividerModule,
    MatSelectModule
  ],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class AdminProducts implements OnInit {
  private readonly api = inject(ApiService);
  private readonly snackBar = inject(MatSnackBar);

  products: any[] = [];
  categories: any[] = [];
  loading = true;
  displayedColumns = ['id', 'name', 'price', 'stock', 'active', 'actions'];

  editingProduct: any = null;
  newProduct: any = {
    name: '',
    slug: '',
    price: 0,
    stock: 0,
    description: '',
    active: true,
    main_image: '',
    category_id: null
  };
  showForm = false;

  selectedProduct: any = null;
  newImageUrl = '';

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    this.loading = true;
    this.api.getProducts().subscribe({
      next: (data) => {
        this.products = data.data ?? data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('Error al cargar productos.', 'Cerrar', { duration: 3000 });
      }
    });
  }

  loadCategories(): void {
    this.api.getCategories().subscribe({
      next: (data) => {
        this.categories = data.data ?? data;
      },
      error: () => {
        this.snackBar.open('Error al cargar categorías.', 'Cerrar', { duration: 3000 });
      }
    });
  }

  generateSlug(value: string): string {
    return value
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  updateNewProductSlug(): void {
    this.newProduct.slug = this.generateSlug(this.newProduct.name || '');
  }

  updateEditProductSlug(): void {
    if (!this.editingProduct) return;
    this.editingProduct.slug = this.generateSlug(this.editingProduct.name || '');
  }

  startEdit(product: any): void {
    this.editingProduct = {
      ...product,
      slug: product.slug ?? '',
      category_id: product.category?.id ?? product.category_id ?? null
    };
    this.showForm = false;
    this.selectedProduct = null;
  }

  cancelEdit(): void {
    this.editingProduct = null;
  }

  saveEdit(): void {
    if (!this.editingProduct) return;

    this.api.updateProduct(this.editingProduct.id, this.editingProduct).subscribe({
      next: () => {
        this.snackBar.open('Producto actualizado.', 'Cerrar', { duration: 3000 });
        this.editingProduct = null;
        this.loadProducts();
      },
      error: () => this.snackBar.open('Error al actualizar.', 'Cerrar', { duration: 3000 })
    });
  }

  deleteProduct(id: number): void {
    if (!confirm('¿Eliminar este producto?')) return;
    this.api.deleteProduct(id).subscribe({
      next: () => {
        this.snackBar.open('Producto eliminado.', 'Cerrar', { duration: 3000 });
        this.loadProducts();
      },
      error: () => this.snackBar.open('Error al eliminar.', 'Cerrar', { duration: 3000 })
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    this.editingProduct = null;
    this.selectedProduct = null;

    if (this.showForm) {
      this.newProduct = {
        name: '',
        slug: '',
        price: 0,
        stock: 0,
        description: '',
        active: true,
        main_image: '',
        category_id: null
      };
    }
  }

  createProduct(): void {
    this.api.createProduct(this.newProduct).subscribe({
      next: () => {
        this.snackBar.open('Producto creado.', 'Cerrar', { duration: 3000 });
        this.showForm = false;
        this.loadProducts();
      },
      error: () => this.snackBar.open('Error al crear producto.', 'Cerrar', { duration: 3000 })
    });
  }

  openImageManager(product: any): void {
    this.selectedProduct = product;
    this.editingProduct = null;
    this.showForm = false;
    this.newImageUrl = '';

    this.api.getProduct(product.id).subscribe({
      next: (data) => {
        this.selectedProduct = data;
      },
      error: () => {}
    });
  }

  addImage(): void {
    if (!this.newImageUrl.trim() || !this.selectedProduct) return;

    const order = (this.selectedProduct.images?.length ?? 0);
    this.api.addProductImage(this.selectedProduct.id, this.newImageUrl.trim(), order).subscribe({
      next: (img) => {
        this.selectedProduct.images = [...(this.selectedProduct.images ?? []), img];
        this.newImageUrl = '';
        this.snackBar.open('Imagen añadida.', 'Cerrar', { duration: 3000 });
      },
      error: () => this.snackBar.open('Error al añadir imagen.', 'Cerrar', { duration: 3000 })
    });
  }

  removeImage(imageId: number): void {
    if (!this.selectedProduct) return;

    this.api.deleteProductImage(this.selectedProduct.id, imageId).subscribe({
      next: () => {
        this.selectedProduct.images = this.selectedProduct.images.filter((i: any) => i.id !== imageId);
        this.snackBar.open('Imagen eliminada.', 'Cerrar', { duration: 3000 });
      },
      error: () => this.snackBar.open('Error al eliminar imagen.', 'Cerrar', { duration: 3000 })
    });
  }
}