import { IPayment } from '../payment/payment.model';

export interface PaymentState {
  currentPaymentDetail: IPayment | null;
  paymentDetails: IPayment[];
  error: string;
}
