import { Action } from '@ngrx/store';
import { IPayment } from '../payment/payment.model';

export enum PaymentActionTypes {
  addPayment = '[Payment] Post',
  addPaymentSuccess = '[Payment] Post Success',
  addPaymentFail = '[Payment] Post Fail',
}

export class addPayment implements Action {
  readonly type = PaymentActionTypes.addPayment;
  constructor(public payload: IPayment) {}
}

export class addPaymentSuccess implements Action {
  readonly type = PaymentActionTypes.addPaymentSuccess;
  constructor(public payload: IPayment) {}
}

export class addPaymentFail implements Action {
  readonly type = PaymentActionTypes.addPaymentFail;
  constructor(public payload: string) {}
}

export type paymentActions = addPayment | addPaymentSuccess | addPaymentFail;
