import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost/proyecto/collectibles-shop/backend/public/api';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    });
  }

  // AUTH
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials, { headers: this.getHeaders() });
  }

  register(data: { name: string; email: string; password: string; password_confirmation: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data, { headers: this.getHeaders() });
  }

  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, {}, { headers: this.getHeaders() });
  }

  getMe(): Observable<any> {
    return this.http.get(`${this.baseUrl}/me`, { headers: this.getHeaders() });
  }

  // PRODUCTS
  getProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/products`, { headers: this.getHeaders() });
  }

  getProduct(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/${id}`, { headers: this.getHeaders() });
  }

  // CATEGORIES
  getCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories`, { headers: this.getHeaders() });
  }

  // TAGS
getTags(): Observable<any> {
  return this.http.get(`${this.baseUrl}/tags`, { headers: this.getHeaders() });
}

  // CONTACT
  sendContact(data: { name: string; email: string; message: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/contact`, data, { headers: this.getHeaders() });
  }

  // ORDERS
  getOrders(): Observable<any> {
    return this.http.get(`${this.baseUrl}/orders`, { headers: this.getHeaders() });
  }

  getOrder(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/orders/${id}`, { headers: this.getHeaders() });
  }

  createOrder(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/orders`, data, { headers: this.getHeaders() });
  }

  // ADMIN
  getAdminStats(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/stats`, { headers: this.getHeaders() });
  }

  createProduct(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/products`, data, { headers: this.getHeaders() });
  }

  updateProduct(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/products/${id}`, data, { headers: this.getHeaders() });
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/products/${id}`, { headers: this.getHeaders() });
  }

  addProductImage(productId: number, image: string, order: number = 0): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/products/${productId}/images`, { image, order }, { headers: this.getHeaders() });
  }

  deleteProductImage(productId: number, imageId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/products/${productId}/images/${imageId}`, { headers: this.getHeaders() });
  }

  getAdminOrders(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/orders`, { headers: this.getHeaders() });
  }

  updateOrderStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/orders/${id}`, { status }, { headers: this.getHeaders() });
  }

  createCategory(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/categories`, data, { headers: this.getHeaders() });
  }

  updateCategory(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/categories/${id}`, data, { headers: this.getHeaders() });
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/categories/${id}`, { headers: this.getHeaders() });
  }

  getAdminContacts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/contact`, { headers: this.getHeaders() });
  }

  getAdminUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/users`, { headers: this.getHeaders() });
  }

  updateUserRole(userId: number, role: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/users/${userId}/role`, { role }, { headers: this.getHeaders() });
  }
}
