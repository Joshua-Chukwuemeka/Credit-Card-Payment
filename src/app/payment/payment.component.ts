import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as paymentActions from '../state/payment.actions';
import * as genericValidator from '../shared/generic-validator';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  mouseoverLogin: boolean;
  paymentForm: FormGroup;
  amount: FormControl;
  cardNumber: FormControl;
  cardExpiry: FormControl;
  cardCcv: FormControl;
  billingName: FormControl;

  constructor(private router: Router, private store: Store<any>) {}

  ngOnInit(): void {
    this.amount = new FormControl('', [
      Validators.required,
      Validators.pattern('\\d*\\.?\\d*'),
      genericValidator.validateAmountValue,
    ]);
    this.cardNumber = new FormControl('', [
      Validators.required,
      Validators.pattern('(\\d{4}\\s){3}\\d{4}'),
    ]);
    this.cardExpiry = new FormControl('', [
      Validators.required,
      Validators.pattern('^([1-9]|0[1-9]|1[0-2])\\s/\\s[\\d]{2}$'),
      genericValidator.validateDateValue,
    ]);
    this.cardCcv = new FormControl('', [
      Validators.minLength(3),
      Validators.pattern('\\d{3}'),
    ]);
    this.billingName = new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z]{3,}\\s[a-zA-Z]{3,}$'),
    ]);

    this.paymentForm = new FormGroup({
      amount: this.amount,
      cardNumber: this.cardNumber,
      cardExpiry: this.cardExpiry,
      cardCcv: this.cardCcv,
      billingName: this.billingName,
    });
  }

  restrictNumber(event) {
    var key_codes = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 0, 8];
    if (!key_codes.includes(event.which)) {
      event.preventDefault();
    }
  }

  restrictFloat(event) {
    var key_codes = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 0, 8, 46];
    console.log(event.which);

    if (!key_codes.includes(event.which)) {
      event.preventDefault();
    }
  }

  formatCardNumber(event) {
    if (event.target.value.length < 15) {
      event.target.value = event.target.value.replace(/(\d{4}$)/g, '$1 ');
    }
  }

  formatCardDate(event) {
    if (event.target.value.length < 5) {
      event.target.value = event.target.value.replace(
        /((0[1-9]$)|(1[0-2]$))/g,
        '$1 / '
      );
    }
  }

  makePayment(paymentData) {
    const date = paymentData.cardExpiry.split(' ');
    const newData = {
      ...paymentData,
      cardExpiry: new Date(+`20${date[2]}`, date[0] - 1),
    };

    this.store.dispatch(new paymentActions.addPayment(newData));

    this.router.navigate(['home']);
  }
}
