import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { SET_PAYMENT_METHOD, RESET_PAYMENTS, setPaymentMethod } from './actions';
import { getPaymentMethod } from "./selectors";

export default function Payments() {
  const dispatch = useDispatch();
  const paymentMethod = useSelector(getPaymentMethod);

  function onPaymentMethodSet(evt) {
    dispatch(setPaymentMethod({ method: evt.target.value }));
  }

  return (
    <div>
      <h3>Online</h3>
      <input onChange={onPaymentMethodSet} checked={paymentMethod === 'blik'} type="radio" name="payment-method" value="blik" /> BLIK<br />
      <input onChange={onPaymentMethodSet} checked={paymentMethod === 'gpay'} type="radio" name="payment-method" value="gpay" /> Google Pay<br />
      <input onChange={onPaymentMethodSet} checked={paymentMethod === 'online'} type="radio" name="payment-method" value="online" /> Online transfer<br />
      <input onChange={onPaymentMethodSet} checked={paymentMethod === 'card-online'} type="radio" name="payment-method" value="card-online" /> Credit card<br />
      <h3>Pickup</h3>
      <input onChange={onPaymentMethodSet} checked={paymentMethod === 'cash'} type="radio" name="payment-method" value="cash" /> Cash<br />
      <input onChange={onPaymentMethodSet} checked={paymentMethod === 'card'} type="radio" name="payment-method" value="card" /> Credit card
    </div>
  );
}

const initialState = {
  method: 'blik',
};

Payments.reducer = (s = initialState, a) => {
  if (a.type === RESET_PAYMENTS) {
    return initialState;
  }

  if (a.type === SET_PAYMENT_METHOD) {
    return { ...s, method: a.payload.method };
  }

  return s;
};
