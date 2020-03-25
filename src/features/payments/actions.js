import { actionCreator } from "@/redux/actions";

export const SET_PAYMENT_METHOD = 'SET_PAYMENT_METHOD';
export const RESET_PAYMENTS = 'RESET_PAYMENTS';

export const setPaymentMethod = actionCreator(SET_PAYMENT_METHOD);
export const resetPayments = actionCreator(RESET_PAYMENTS);
