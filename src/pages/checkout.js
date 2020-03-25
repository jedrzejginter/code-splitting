import dynamic from 'next/dynamic';
import { useSelector, useDispatch } from 'react-redux';

import { moduleMiddleware } from '@/module';

import { resetBasket } from '@/features/basket/actions';
import { submitOrder } from '@/features/order/actions';
import { getIsOrderStarted } from '@/features/order/selectors';
import { resetPayments } from '@/features/payments/actions';

const Payments = dynamic(() => import('@/features/payments').then(moduleMiddleware('payments')), {
  ssr: false,
  loading: () => "Loading payments information..."
});

export default function Checkout() {
  const dispatch = useDispatch();
  const isStarted = useSelector(getIsOrderStarted);

  const onSubmitOrder = () => {
    dispatch(submitOrder());
    dispatch(resetBasket());
    dispatch(resetPayments());
  };

 return (
    <div>
      <p css={{ color: 'red' }}>
        Your order is ready to submit!<br />
        Pick a payment method a click button below.
      </p>
      {isStarted && <Payments />}
      <button css={{ marginTop: 20 }} onClick={isStarted ? onSubmitOrder : undefined}>submit</button>
    </div>
  );
}
