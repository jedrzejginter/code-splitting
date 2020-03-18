import { useSelector } from 'react-redux';
import { all, put, takeLatest } from 'redux-saga/effects';

import { ADD_PRODUCT, RESET_BASKET } from './actions';
import { wrapProduct } from "./utils";
import { getProducts } from './selectors';

export default function BasketV2() {
  const products = useSelector(getProducts);

  return (
    <div>
      <h3>Basket V2!</h3>
      {products.length === 0 && <i>no products</i>}
      <ul>
        {products.map((p, index) => (
          <li key={index}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}

const initialState = {products:[]};
BasketV2.reducer = (state = initialState, action) => {
  if (action.type === RESET_BASKET) {
    return initialState;
  }

  if (action.type === ADD_PRODUCT) {
    return {...state, products: [...state.products, action.payload] };
  }

  return state;
}
