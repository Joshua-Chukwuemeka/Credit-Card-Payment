import { Routes } from '@angular/router';
import { Error404Component } from './shared/errors/404.component';
import { PaymentComponent } from './payment/payment.component';
import { HomeComponent } from './home/home.component';

export const appRoute: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: {
      title: 'Home',
    },
  },
  {
    path: 'payment',
    component: PaymentComponent,
    data: {
      title: 'Payment',
    },
  },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: Error404Component },
];
