import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should persist token and user', () => {
    service.saveToken('abc');
    service.saveUser({ name: 'Demo' });
    service.setLoggedIn(true);

    expect(service.getToken()).toBe('abc');
    expect(service.getUser()?.name).toBe('Demo');
    expect(service.isLoggedIn()).toBe(true);
  });

  it('should clear auth data on logout', () => {
    service.saveToken('abc');
    service.saveUser({ name: 'Demo' });

    service.logout();

    expect(service.getToken()).toBeNull();
    expect(service.getUser()).toBeNull();
    expect(service.isLoggedIn()).toBe(false);
  });
});
