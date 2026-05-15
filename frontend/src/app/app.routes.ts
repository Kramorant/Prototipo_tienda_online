import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Products } from './components/products/products';
import { ProductDetail } from './components/product-detail/product-detail';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Contact } from './components/contact/contact';
import { Cart } from './components/cart/cart';
import { Profile } from './components/profile/profile';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';
import { adminGuard } from './guards/admin.guard';
import { AdminLayout } from './components/admin/layout/layout';
import { AdminDashboard } from './components/admin/dashboard/dashboard';
import { AdminProducts } from './components/admin/products/products';
import { AdminOrders } from './components/admin/orders/orders';
import { AdminCategories } from './components/admin/categories/categories';
import { AdminContacts } from './components/admin/contacts/contacts';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'products', component: Products },
  { path: 'products/:id', component: ProductDetail },
  { path: 'login', component: Login, canActivate: [guestGuard] },
  { path: 'register', component: Register, canActivate: [guestGuard] },
  { path: 'contact', component: Contact },
  { path: 'cart', component: Cart, canActivate: [authGuard] },
  { path: 'profile', component: Profile, canActivate: [authGuard] },
  {
    path: 'admin',
    component: AdminLayout,
    canActivate: [adminGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboard },
      { path: 'products', component: AdminProducts },
      { path: 'orders', component: AdminOrders },
      { path: 'categories', component: AdminCategories },
      { path: 'contacts', component: AdminContacts },
    ]
  },
  { path: '**', redirectTo: '' }
];
