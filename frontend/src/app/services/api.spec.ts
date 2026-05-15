import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call /me with auth header', () => {
    localStorage.setItem('token', 'test-token');

    service.getMe().subscribe();

    const request = httpMock.expectOne((req) => req.url.endsWith('/me'));
    expect(request.request.method).toBe('GET');
    expect(request.request.headers.get('Authorization')).toBe('Bearer test-token');
    request.flush({});
  });

  it('should call /orders/{id}', () => {
    service.getOrder(10).subscribe();

    const request = httpMock.expectOne((req) => req.url.endsWith('/orders/10'));
    expect(request.request.method).toBe('GET');
    request.flush({});
  });
});
