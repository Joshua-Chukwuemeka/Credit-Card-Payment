import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';

import { IPayment } from '../payment/payment.model';
import { PaymentState } from '../state/payment.state';
import * as fromPayment from '../state/payment.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  payment: IPayment;
  componentActive = true;

  constructor(private store: Store<{ payment: PaymentState }>) {}

  ngOnInit(): void {
    this.store
      .pipe(
        select(fromPayment.getPaymentDetailState),
        takeWhile(() => this.componentActive)
      )
      .subscribe((paymentDetail) => {
        this.payment = paymentDetail;
      });
  }

  ngOnDestroy() {
    this.componentActive = false;
  }
}
