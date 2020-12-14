import { ViewDetailsComponent } from './view-details/view-details.component';
import { StatsComponent } from './stats/stats.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { AuthGuard } from './auth.guard';
import { AdminComponent } from './admin/admin.component';
import { AccountComponent } from './account/account.component';
import { OrderComponent } from './order/order.component';
import { DialogContentComponent } from './dialog-content/dialog-content.component';

const routes: Routes = [
  { path: 'cart', component : CartComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent} ,
  {path:'aboutus',component:AboutusComponent},
  {path:'stats',component:StatsComponent },
  {path: 'login', component: LoginComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'admin', component: AdminComponent, canActivate:[AuthGuard]},
  {path: 'account', component: AccountComponent, canActivate:[AuthGuard]},
  {path: 'order/:name', component: OrderComponent, canActivate:[AuthGuard]},
  {path: 'confirm', component: DialogContentComponent, canActivate: [AuthGuard]},
  {path:'viewdetails/:id', component: ViewDetailsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ HomeComponent , CartComponent, LoginComponent, SigninComponent , AdminComponent
                                  ,AccountComponent, OrderComponent, DialogContentComponent];
