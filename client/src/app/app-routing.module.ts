import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { NotfoundComponent } from './core/notfound/notfound.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ProductNewComponent } from './product/product-new/product-new.component';
import { ForbiddenComponent } from './core/forbidden/forbidden.component';
import { Role } from './shared/models/role';


const routes: Routes = [
  {path: '', component: HomeComponent, data: {breadcrumb: 'Home'}},
  {path: 'test-error', component: TestErrorComponent, data: {breadcrumb: 'Test Errors'}},
  {path: 'server-error', component: ServerErrorComponent, data: {breadcrumb: 'Server Error'}},
  {path: 'not-found', component: NotfoundComponent, data: {breadcrumb: 'Not Found'}},
  {path: 'forbidden', component: ForbiddenComponent, data: {breadcrumb: 'Forbidden'}},
  {path: 'shop', loadChildren: () => import('./shop/shop.module').then(mod => mod.ShopModule), data: {breadcrumb: 'Shop'}},
  {path: 'basket', loadChildren: () => import('./basket/basket.module').then(mod => mod.BasketModule), data: {breadcrumb: 'Basket'}},
  {path: 'product',
  canActivate: [AuthGuard],
  canLoad: [AuthGuard],
  loadChildren: () => import('./product/product.module')
 .then(mod => mod.ProductModule), 
 data: {
    roles: [Role.Admin],
    breadcrumb: 'Product'
  }},
  {path: 'products/new',
  component: ProductNewComponent,
  canActivate: [AuthGuard],
  canLoad: [AuthGuard],
   
 data: {
    roles: [Role.Admin],
    breadcrumb: 'New product'
  }},
  {path: 'checkout',
   canActivate: [AuthGuard],
   loadChildren: () => import('./checkout/checkout.module')
  .then(mod => mod.CheckoutModule), data: {breadcrumb: 'Checkout'}},
  {
    path: 'orders',
    canActivate: [AuthGuard],
    loadChildren: () => import('./orders/orders.module')
      .then(mod => mod.OrdersModule), data: { breadcrumb: 'Orders' }
  },
  {path: 'account', loadChildren: () => import('./account/account.module')
  .then(mod => mod.AccountModule), data: {breadcrumb: {skip : true}}},
  {path: '**', redirectTo: 'not-found', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
