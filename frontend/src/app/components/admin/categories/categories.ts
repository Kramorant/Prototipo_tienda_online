import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-admin-categories',
  imports: [
    FormsModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatCardModule,
  ],
  templateUrl: './categories.html',
  styleUrl: './categories.scss'
})
export class AdminCategories implements OnInit {
  private readonly api = inject(ApiService);
  private readonly snackBar = inject(MatSnackBar);

  categories: any[] = [];
  loading = true;
  editingCategory: any = null;
  newCategory = { name: '', slug: '', description: '' };
  showForm = false;

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.loading = true;
    this.api.getCategories().subscribe({
      next: (data) => {
        this.categories = data.data ?? data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('Error al cargar categorías.', 'Cerrar', { duration: 3000 });
      }
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    this.editingCategory = null;
    if (this.showForm) {
      this.newCategory = { name: '', slug: '', description: '' };
    }
  }

  createCategory(): void {
    this.api.createCategory(this.newCategory).subscribe({
      next: () => {
        this.snackBar.open('Categoría creada.', 'Cerrar', { duration: 3000 });
        this.showForm = false;
        this.loadCategories();
      },
      error: () => this.snackBar.open('Error al crear categoría.', 'Cerrar', { duration: 3000 })
    });
  }

  startEdit(cat: any): void {
    this.editingCategory = { ...cat };
    this.showForm = false;
  }

  saveEdit(): void {
    if (!this.editingCategory) return;
    this.api.updateCategory(this.editingCategory.id, this.editingCategory).subscribe({
      next: () => {
        this.snackBar.open('Categoría actualizada.', 'Cerrar', { duration: 3000 });
        this.editingCategory = null;
        this.loadCategories();
      },
      error: () => this.snackBar.open('Error al actualizar.', 'Cerrar', { duration: 3000 })
    });
  }

  deleteCategory(id: number): void {
    if (!confirm('¿Eliminar esta categoría?')) return;
    this.api.deleteCategory(id).subscribe({
      next: () => {
        this.snackBar.open('Categoría eliminada.', 'Cerrar', { duration: 3000 });
        this.loadCategories();
      },
      error: () => this.snackBar.open('Error al eliminar.', 'Cerrar', { duration: 3000 })
    });
  }
}
