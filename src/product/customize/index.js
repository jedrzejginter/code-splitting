import { all, call, put, takeEvery } from 'redux-saga/effects';

import Modal from "../../modal";
import { requestNewProduct } from './request';
import { fetchProduct, setConfig, FETCH_REQUEST } from './actions';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductConfig } from './selectors';

export default function CustomizeProduct({ product, onClose }) {
  const dispatch = useDispatch();
  const config = useSelector(getProductConfig);

  useEffect(() => {
    dispatch(fetchProduct({ product }));
  }, []);

  return (
    <Modal onClose={onClose}>
      <h2>{product.name}</h2>
      {config.length === 0 && <i>loading configuration...</i>}
      {config.map((c, index) => (
        <div key={index}>
          <h3>{c.optionTitle}</h3>
          {c.availableItems.map((i, index) => (
            <span key={index} style={{
              backgroundColor: i.isDefault ? '#aaa' : undefined,
              display: 'inline-block', margin: 5, border: '1px dotted blue'
              }}>
              {i.name}
            </span>
          ))}
        </div>
      ))}
    </Modal>
  );
}

CustomizeProduct.sagas = {
  *root() {
    yield all([
      takeEvery(FETCH_REQUEST, function*({ payload: { product } }) {
        const r = yield call(requestNewProduct, { product, restaurantId: 543 });

        if (r && r.data) {
          const { currentProduct } = r.data;
          yield put(setConfig({ config: currentProduct.productConfig }));
        }
      }),
    ]);
  }
}
