import dynamic from 'next/dynamic';
import { useSelector, useDispatch } from 'react-redux';

import { resetBasket } from '../basket/actions';
import { getProducts } from "../basket/selectors";
import { submitOrder } from '../order/actions';
import { getIsOrderStarted } from '../order/selectors';
import { moduleMiddleware } from '../module';

const Basket = dynamic(() => import("../basket").then(moduleMiddleware('basket')), { ssr: false });

export default function Checkout() {
  const dispatch = useDispatch();
  const products = useSelector(getProducts);
  const isStarted = useSelector(getIsOrderStarted);

  const onSubmitOrder = () => {
    dispatch(submitOrder());
    dispatch(resetBasket());
  };

 return (
    <div>
      {isStarted && (
        <>
          <Basket />
          <button onClick={onSubmitOrder}>submit</button>
        </>
      )}
    </div>
  );
}
