import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  sale_price: number | null;
  image: string | null;
  quantity: number;
  stock: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly storageKey = 'cart';
  private readonly itemsSubject = new BehaviorSubject<CartItem[]>(this.loadFromStorage());
  readonly items$ = this.itemsSubject.asObservable();

  private loadFromStorage(): CartItem[] {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? (JSON.parse(stored) as CartItem[]) : [];
    } catch {
      return [];
    }
  }

  private saveToStorage(items: CartItem[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
    this.itemsSubject.next(items);
  }

  getItems(): CartItem[] {
    return this.itemsSubject.value;
  }

  addItem(product: any): void {
    if (!product?.id) {
      return;
    }

    const stock = Number(product.stock ?? 0);
    if (stock <= 0) {
      return;
    }

    const items = [...this.itemsSubject.value];
    const existingItem = items.find((item) => item.id === Number(product.id));

    if (existingItem) {
      existingItem.quantity = Math.min(existingItem.quantity + 1, existingItem.stock);
    } else {
      items.push({
        id: Number(product.id),
        name: String(product.name ?? 'Producto'),
        price: Number(product.price ?? 0),
        sale_price: product.sale_price === null || product.sale_price === undefined ? null : Number(product.sale_price),
        image: product.image ?? product.main_image ?? null,
        quantity: 1,
        stock
      });
    }

    this.saveToStorage(items);
  }

  removeItem(id: number): void {
    const items = this.itemsSubject.value.filter((item) => item.id !== id);
    this.saveToStorage(items);
  }

  updateQuantity(id: number, quantity: number): void {
    const items = [...this.itemsSubject.value];
    const item = items.find((cartItem) => cartItem.id === id);
    if (!item) {
      return;
    }

    item.quantity = Math.max(1, Math.min(quantity, item.stock));
    this.saveToStorage(items);
  }

  clearCart(): void {
    this.saveToStorage([]);
  }

  getTotal(): number {
    return this.itemsSubject.value.reduce((total, item) => {
      const unitPrice = item.sale_price ?? item.price;
      return total + unitPrice * item.quantity;
    }, 0);
  }

  getItemCount(): number {
    return this.itemsSubject.value.reduce((count, item) => count + item.quantity, 0);
  }
}
