import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';

import { PaymentService } from '../payment/payment.service';
import { ToastrService } from '../core/toastr.service';
import * as paymentActions from './payment.actions';
import { IPayment } from '../payment/payment.model';

@Injectable()
export class PaymentEffects {
  constructor(
    private actions$: Actions,
    private paymentService: PaymentService,
    private toastrService: ToastrService
  ) {}

  addPayment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(paymentActions.PaymentActionTypes.addPayment),
      mergeMap((action: paymentActions.addPayment) =>
        this.paymentService.makePayment(action.payload).pipe(
          map(
            (payment: IPayment) => new paymentActions.addPaymentSuccess(payment)
          ),
          tap(() => this.toastrService.success('Payment posted successfully')),
          catchError((err) => of(new paymentActions.addPaymentFail(err)))
        )
      )
    )
  );
}
