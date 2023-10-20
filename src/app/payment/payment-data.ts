import { InMemoryDbService } from 'angular-in-memory-web-api';

import { IPayment } from '../payment/payment.model';

export class PaymentData implements InMemoryDbService {
  createDb() {
    const payments: IPayment[] = [];
    return { payments };
  }
}
