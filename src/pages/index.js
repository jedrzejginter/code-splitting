import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addProduct } from '../basket/actions';
import { getBasketLines } from '../basket/selectors';

import { startOrder } from '../order/actions';
import { getIsOrderStarted, getAddressForOrder } from '../order/selectors';

import Menu from '../menu';
import { fetchDefaultMenu } from '../menu/actions';
import { actionCreator } from '../redux/helpers';
import AddressSearch from '../address';
import { isBrowser } from '../utils';
import { moduleMiddleware } from '../module';
import { requestProduct, resetProduct } from '../product/customize/actions';
import { getProductForCustomize } from '../product/customize/selectors';

const CustomizeProduct = dynamic(
  () => import('../product/customize').then(moduleMiddleware('product')),
  { ssr: false }
);

export default function Home() {
  const dispatch = useDispatch();
  const [addressForOrder, setAddressForOrder] = useState('');

  const isStarted = useSelector(getIsOrderStarted);
  const basketLines = useSelector(getBasketLines);
  const productForCustomize = useSelector(getProductForCustomize);

  useEffect(() => {
    dispatch(fetchDefaultMenu());
  }, []);

  const closeModal = () => {
    dispatch(resetProduct());
  }

  const onCustomizeProduct = (product) => {
    dispatch(requestProduct({ product }));
  }

  const onStartOrder = () => {
    dispatch(startOrder({ address: addressForOrder }));
  };

  const onAddProduct = (p) => {
    dispatch(addProduct({
      id: p.id,
      name: p.name,
      price: p.price,
    }));
  };

  const onChooseAddress = (a) => {
    setAddressForOrder(a.name);
  }

  return (
    <div>
      {!isStarted &&
        <AddressSearch onChooseAddress={onChooseAddress} current={addressForOrder} />
      }
      {!isStarted && isBrowser && (
        <button disabled={!addressForOrder} onClick={onStartOrder}>
          Begin order
        </button>
      )}
      <Menu
        onCustomizeProduct={onCustomizeProduct}
        canAddProduct={isStarted}
        onAddProduct={onAddProduct}
      />
      {productForCustomize && <CustomizeProduct product={productForCustomize} onClose={closeModal} />}
    </div>
  );
}
