import dynamic from 'next/dynamic';
import { useSelector, useDispatch } from 'react-redux';

import { resetBasket } from '../basket/actions';
import { submitOrder } from '../order/actions';
import { getIsOrderStarted } from '../order/selectors';
import { moduleMiddleware } from '../module';

const Payments = dynamic(() => import('../payments').then(moduleMiddleware('payments')), {
  ssr: false,
  loading: () => "Loading payments information..."
});

export default function Checkout() {
  const dispatch = useDispatch();
  const isStarted = useSelector(getIsOrderStarted);

  const onSubmitOrder = () => {
    dispatch(submitOrder());
    dispatch(resetBasket());
  };

 return (
    <div>
      <p>
        Your order is ready to submit!<br />
        Pick a payment method a click button below.
      </p>
      {isStarted && <Payments />}
      <button style={{ marginTop: 20 }} onClick={isStarted ? onSubmitOrder : undefined}>submit</button>
    </div>
  );
}
