import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    localStorage.removeItem('cart');
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should add items and calculate totals', () => {
    service.addItem({ id: 1, name: 'Figura', price: 100, sale_price: 80, stock: 5 });
    service.addItem({ id: 1, name: 'Figura', price: 100, sale_price: 80, stock: 5 });

    expect(service.getItemCount()).toBe(2);
    expect(service.getTotal()).toBe(160);
  });

  it('should clamp quantity between 1 and stock', () => {
    service.addItem({ id: 1, name: 'Figura', price: 100, sale_price: null, stock: 3 });
    service.updateQuantity(1, 10);
    expect(service.getItems()[0]?.quantity).toBe(3);

    service.updateQuantity(1, 0);
    expect(service.getItems()[0]?.quantity).toBe(1);
  });
});
