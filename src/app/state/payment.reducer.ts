import { createFeatureSelector, createSelector } from '@ngrx/store';

import { paymentActions, PaymentActionTypes } from './payment.actions';
import { PaymentState } from './payment.state';

// Initializing state
const initialState: PaymentState = {
  currentPaymentDetail: null,
  paymentDetails: [],
  error: '',
};

const getPaymentState = createFeatureSelector<PaymentState>('payment');

export const getPaymentDetailState = createSelector(
  getPaymentState,
  (state) => state.currentPaymentDetail
);

export const getError = createSelector(getPaymentState, (state) => state.error);

export function paymentReducer(
  state = initialState,
  action: paymentActions
): PaymentState {
  switch (action.type) {
    case PaymentActionTypes.addPaymentSuccess:
      return {
        ...state,
        currentPaymentDetail: { ...action.payload },
      };

    case PaymentActionTypes.addPaymentFail:
      return {
        ...state,
        currentPaymentDetail: null,
        error: action.payload,
      };
    default:
      return state;
  }
}
