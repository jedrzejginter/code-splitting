import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addProduct } from '../basket/actions';
import { getProducts } from '../basket/selectors';

import { injectSaga, injectReducer } from '../redux';
import { getIsOrderStarted } from '../order/selectors';
import { moduleMiddleware } from '../module';

const Basket = dynamic(() => import("../basket").then(moduleMiddleware('basket')), { ssr: false });

export default function Home() {
  const dispatch = useDispatch();
  const [state, setState] = useState(0);

  const isStarted = useSelector(getIsOrderStarted);
  const products = useSelector(getProducts);

  const startOrder = () => {
    dispatch({
      type: 'START_ORDER'
    });
  };

  const onAddProduct = () => {
    dispatch(addProduct({
      id: 123,
      name: 'Me is product!',
    }));
  };

  return (
    <div>
      {!isStarted && <button onClick={startOrder}>Begin order</button>}
      {isStarted && <Basket />}
      <div>
        <h4>Me is product!</h4>
        {isStarted
          ? <button onClick={onAddProduct}>add me ($9.99)</button>
          : <i>start order and buy me!</i>
        }
      </div>
    </div>
  );
}
