import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', loadComponent:() => import('./layouts/layout-blank/layout-blank.component').then((M) => M.LayoutBlankComponent), children: [
    {path:'', redirectTo: 'home', pathMatch:'full'},
    {path:'home', loadComponent:() => import('./components/home/home.component').then((M) => M.HomeComponent), title: 'Home'},
    {path:'cart', loadComponent:() => import('./components/cart/cart.component').then((M) => M.CartComponent), title: 'Cart'},
    {path:'products', loadComponent:() => import('./components/products/products.component').then((M) => M.ProductsComponent), title: 'Products'},
    {path:'categories', loadComponent:() => import('./components/categories/categories.component').then((M) => M.CategoriesComponent), title: 'Categories'},
    {path:'brands', loadComponent:() => import('./components/brands/brands.component').then((M) => M.BrandsComponent), title: 'Brands'}
  ]},
  {path:'', loadComponent:() => import('./layouts/layout-auth/layout-auth.component').then((M) => M.LayoutAuthComponent), children: [
    {path:'', redirectTo: 'login', pathMatch:'full'},
    {path:'register', loadComponent:() => import('./components/register/register.component').then((M) => M.RegisterComponent), title: 'Register'},
    {path:'login', loadComponent:() => import('./components/login/login.component').then((M) => M.LoginComponent), title: 'Login'}
  ]},
  {path:'**', loadComponent:() => import('./components/notfound/notfound.component').then((M) => M.NotfoundComponent), title: 'Not Found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
