// Angular Modules Imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { paymentReducer } from './state/payment.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

// Modules Imports
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

// Components Import
import { AppComponent } from './app.component';
import { PaymentComponent } from './payment/payment.component';

//
import { appRoute } from './route';
import { PaymentService } from './payment/payment.service';
import { HomeComponent } from './home/home.component';
import { environment } from 'src/environments/environment';
import { PaymentEffects } from './state/payment.effects';
import { PaymentData } from './payment/payment-data';

@NgModule({
  declarations: [AppComponent, PaymentComponent, HomeComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(PaymentData),
    RouterModule.forRoot(appRoute),
    StoreModule.forRoot({ payment: paymentReducer }),
    EffectsModule.forRoot([PaymentEffects]),
    StoreDevtoolsModule.instrument({
      name: 'Credit Card Payment',
      maxAge: 25,
      logOnly: environment.production,
    }),
    CoreModule,
    SharedModule,
  ],
  providers: [PaymentService],
  bootstrap: [AppComponent],
})
export class AppModule {}
