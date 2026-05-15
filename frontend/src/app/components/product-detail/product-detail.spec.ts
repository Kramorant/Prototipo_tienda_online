import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';

import { ProductDetail } from './product-detail';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';

describe('ProductDetail', () => {
  let component: ProductDetail;
  let fixture: ComponentFixture<ProductDetail>;
  const mockProduct = {
    id: 1,
    name: 'Product',
    slug: 'product',
    description: 'desc',
    price: 100,
    sale_price: null,
    stock: 1,
    sku: 'SKU',
    main_image: 'main.jpg',
    scale: null,
    condition: 'new',
    release_date: null,
    featured: false,
    active: true,
    category: null,
    images: [
      { id: 1, image: 'second.jpg', order: 2 },
      { id: 2, image: 'main.jpg', order: 1 },
      { id: 3, image: 'first.jpg', order: 0 }
    ]
  };
  const apiServiceSpy = {
    getProduct: () => of({ data: mockProduct })
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetail],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: '1' })
            }
          }
        },
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: CartService, useValue: { addItem: () => {} } },
        { provide: MatSnackBar, useValue: { open: () => {} } },
        { provide: Router, useValue: { navigate: () => Promise.resolve(true) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should build gallery with main image first, sorted images, and deduplicated entries', () => {
    component.product = { ...mockProduct };

    component.buildGallery();

    expect(component.allImages).toEqual(['main.jpg', 'first.jpg', 'second.jpg']);
    expect(component.allImages.filter((image) => image === 'main.jpg').length).toBe(1);
    expect(component.selectedImage).toBe('main.jpg');
  });

  it('should update selected image', () => {
    component.selectImage('thumb.jpg');

    expect(component.selectedImage).toBe('thumb.jpg');
  });
});
