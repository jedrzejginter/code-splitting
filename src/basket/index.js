import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { all, put, takeLatest } from 'redux-saga/effects';

import { ADD_PRODUCT, RESET_BASKET, REMOVE_BASKET_LINE, removeBasketLine } from './actions';
import { wrapProduct } from "./utils";
import { getBasketLines } from './selectors';
import { getAddressForOrder } from '../order/selectors';

export default function Basket({ hasButton, hasDeletion }) {
  const dispatch = useDispatch();
  const lines = useSelector(getBasketLines);
  const addressForOrder = useSelector(getAddressForOrder);

  return (
    <div css={{ border: '2px solid black', borderRadius: 10, padding: 10 }}>
      <h3>Basket!</h3>
      {addressForOrder && (
        <div>
          <i>Delivery to: {addressForOrder.name}</i>
        </div>
      )}
      {lines.length === 0 && <i>no products</i>}
      <ul>
        {lines.map((l, index) => (
          <li key={index}>
            {l.product.name} ({l.product.price} pln) {hasDeletion &&
              <span className="btn-like" onClick={() => dispatch(removeBasketLine({ uuid: l.uuid }))}>X</span>
            }
          </li>
        ))}
      </ul>
      {lines.length > 0 && hasButton &&
        <Link href="/checkout">
          <button>ORDER!</button>
        </Link>
      }

    </div>
  );
}

const initialState = { lines:[] };
Basket.reducer = (state = initialState, action) => {
  if (action.type === RESET_BASKET) {
    return initialState;
  }

  if (action.type === ADD_PRODUCT) {
    return {...state, lines: [...state.lines, { uuid: Date.now().toString(),  product: action.payload }] };
  }

  if (action.type === REMOVE_BASKET_LINE) {
    return {...state, lines: state.lines.filter((p) => {
      return p.uuid !== action.payload.uuid
    }) };
  }

  return state;
}
