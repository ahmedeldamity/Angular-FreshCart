import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {path:'', canActivate:[authGuard], loadComponent:() => import('./layouts/layout-blank/layout-blank.component').then((M) => M.LayoutBlankComponent), children: [
    {path:'', redirectTo: 'home', pathMatch:'full'},
    {path:'home', loadComponent:() => import('./components/home/home.component').then((M) => M.HomeComponent), title: 'Home'},
    {path:'cart', loadComponent:() => import('./components/cart/cart.component').then((M) => M.CartComponent), title: 'Cart'},
    {path:'products', loadComponent:() => import('./components/products/products.component').then((M) => M.ProductsComponent), title: 'Products'},
    {path:'categories', loadComponent:() => import('./components/categories/categories.component').then((M) => M.CategoriesComponent), title: 'Categories'},
    {path:'categoryDetails/:id', loadComponent:() => import('./components/category-details/category-details.component').then((M) => M.CategoryDetailsComponent), title: 'Category Details'},
    {path:'payment/:id', loadComponent:() => import('./components/payment/payment.component').then((M) => M.PaymentComponent), title: 'Payment'},
    {path:'allorders', loadComponent:() => import('./components/orders/orders.component').then((M) => M.OrdersComponent), title: 'All Orders'},
    {path:'forgetpassword', loadComponent:() => import('./components/forgetpassword/forgetpassword.component').then((M) => M.ForgetpasswordComponent), title: 'Forget Password'},
    {path:'productdetails/:id', loadComponent:() => import('./components/details/details.component').then((M) => M.DetailsComponent), title: 'Product Details'},
    {path:'wishlist', loadComponent:() => import('./components/wishlist/wishlist.component').then((M) => M.WishlistComponent), title: 'Wish List'},
  ]},
  {path:'', loadComponent:() => import('./layouts/layout-auth/layout-auth.component').then((M) => M.LayoutAuthComponent), children: [
    {path:'', redirectTo: 'login', pathMatch:'full'},
    {path:'register', loadComponent:() => import('./components/register/register.component').then((M) => M.RegisterComponent), title: 'Register'},
    {path:'login', loadComponent:() => import('./components/login/login.component').then((M) => M.LoginComponent), title: 'Login'},
    {path:'forget', loadComponent:() => import('./components/forgetpassword/forgetpassword.component').then((M) => M.ForgetpasswordComponent), title: 'Forget Password'},
  ]},
  {path:'**', loadComponent:() => import('./components/notfound/notfound.component').then((M) => M.NotfoundComponent), title: 'Not Found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
