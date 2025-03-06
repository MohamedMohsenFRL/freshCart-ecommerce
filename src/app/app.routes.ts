import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { ForgetPasswordComponent } from './auth/components/forget-password/forget-password.component';
import { CategoriesComponent } from './features/pages/categories/categories.component';
import { BrandsComponent } from './features/pages/brands/brands.component';
import { ProductDetailsComponent } from './features/pages/product-details/product-details.component';
import { CartComponent } from './features/pages/cart/cart.component';
import { WishlistComponent } from './features/pages/wishlist/wishlist.component';
import { loginGuard } from './core/guards/login/login.guard';
import { notLoginGuard } from './core/guards/notLogin/not-login.guard';
import { CheckoutComponent } from './features/pages/order/checkout/checkout.component';
import { AllordersComponent } from './features/pages/order/allorders/allorders.component';

export const routes: Routes = [
  {path:"",component:MainLayoutComponent,children:[
    {path:'',redirectTo:"home",pathMatch:"full"},
    {path:"home",loadComponent:() => import('./features/pages/home/home.component').then(c => c.HomeComponent),title:"Home"},
    {path:"products",loadComponent:() => import('./features/pages/products/products.component').then(c => c.ProductsComponent),title:"Products"},
    {path:"categories",loadComponent:() => import('./features/pages/categories/categories.component').then(c => c.CategoriesComponent),title:"Categories"},
    {path:"brands",loadComponent:() => import('./features/pages/brands/brands.component').then(c => c.BrandsComponent),title:"Brands"},
    {path:"wishlist",loadComponent:() => import('./features/pages/wishlist/wishlist.component').then(c => c.WishlistComponent),title:"Wishlist",canActivate:[notLoginGuard]},
    {path:"cart",loadComponent:() => import('./features/pages/cart/cart.component').then(c => c.CartComponent),title:"Cart",canActivate:[notLoginGuard]},
    {path:"productDetails/:id",loadComponent:() => import('./features/pages/product-details/product-details.component').then(c => c.ProductDetailsComponent),title:"Product Details"},
    {path:"checkout/:id",loadComponent:() => import('./features/pages/order/checkout/checkout.component').then(c => c.CheckoutComponent),title:"Checkout",canActivate:[notLoginGuard]},
    {path:"allorders",loadComponent:() => import('./features/pages/order/allorders/allorders.component').then(c => c.AllordersComponent),title:"Orders",canActivate:[notLoginGuard]},
  ]},
  {path:"",component:AuthLayoutComponent,canActivate:[loginGuard],children:[
    {path:"login",loadComponent:() => import('./auth/components/login/login.component').then(c => c.LoginComponent),title:"Login"},
    {path:"register",loadComponent:() => import('./auth/components/register/register.component').then(c => c.RegisterComponent),title:"Register"},
    {path:"forgetPassword",loadComponent:() => import('./auth/components/forget-password/forget-password.component').then(c => c.ForgetPasswordComponent),title:"Forget Password"},
  ]},
  {path:"**",component:NotFoundComponent}
];
