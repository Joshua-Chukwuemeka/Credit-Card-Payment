export class IPayment {
  id?: string;
  amount: number;
  cardNumber: string;
  cardExpiry: Date;
  cardCcv?: string;
  billingName: string;

  constructor(paymentDto) {
    this.amount = paymentDto.amount;
    this.cardNumber = paymentDto.cardNumber;
    this.cardExpiry = paymentDto.cardExpiry;
    this.cardCcv = paymentDto.cardCcv;
    this.billingName = paymentDto.billingName;
  }
}
