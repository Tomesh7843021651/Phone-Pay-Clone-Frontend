import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{LoginComponent} from './login/login.component'
import{HomeComponent} from './home/home.component'
import{RegisterComponent} from './register/register.component'

import{DashboardComponent} from './dashboard/dashboard.component'
import{ProfileComponent} from './dashboard/profile/profile.component'

import{PaymentComponent} from './dashboard/payment/payment.component'
const routes: Routes = [
  {
    path:"",component:HomeComponent
  },
  {
    path:"login",component:LoginComponent
  },
  {
    path:"register",component:RegisterComponent
  },
  {
    path:"dashboard",component:DashboardComponent
  },
  {
    path:"profile",component:ProfileComponent
  },
  {
    path:"payment",component:PaymentComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
