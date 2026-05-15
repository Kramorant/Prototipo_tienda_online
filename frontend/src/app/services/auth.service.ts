import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly loggedIn$ = new BehaviorSubject<boolean>(this.isLoggedIn());
  readonly isLoggedIn$ = this.loggedIn$.asObservable();

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getUser(): any {
    try {
      return JSON.parse(localStorage.getItem('user') || 'null');
    } catch {
      return null;
    }
  }

  saveUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  isAdmin(): boolean {
    return this.getUser()?.role === 'admin';
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.loggedIn$.next(false);
  }

  setLoggedIn(value: boolean): void {
    this.loggedIn$.next(value);
  }
}
