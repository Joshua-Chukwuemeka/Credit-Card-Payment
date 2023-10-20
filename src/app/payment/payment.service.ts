import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { IPayment } from './payment.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private paymentUrl = `/api/payments`;

  constructor(private http: HttpClient) {}

  makePayment(paymentData): Observable<IPayment> {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
    };

    // generiting random string for payment id
    const generateRandomString = (length = 6) =>
      Math.random().toString(20).substr(2, length);

    return this.http
      .post<IPayment>(
        `${this.paymentUrl}`,
        { ...paymentData, id: generateRandomString() },
        options
      )

      .pipe(tap((d) => console.log(d)))
      .pipe(
        map((data) => {
          return new IPayment(data);
        })
      )
      .pipe(catchError(this.handleError));
  }

  // Handling error
  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
