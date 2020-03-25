import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addProduct } from '@/basket/actions';
import { getBasketLines } from '@/basket/selectors';

import { startOrder } from '@/order/actions';
import { getIsOrderStarted, getAddressForOrder } from '@/order/selectors';

import Menu from '@/menu';
import { fetchDefaultMenu } from '@/menu/actions';
import { actionCreator } from '@/redux/helpers';
import AddressSearch from '@/address';
import { isBrowser } from '@/utils';
import { moduleMiddleware } from '@/module';
import { requestProduct, resetProduct } from '@/product/customize/actions';
import { getProductForCustomize } from '@/product/customize/selectors';
import { fetchRestaurantByGeo } from '@/restaurant/actions';
import { injectSaga } from '@/redux';

const CustomizeProduct = dynamic(
  () => import('@/product/customize').then(moduleMiddleware('product')),
  { ssr: false }
);

export default function Home() {
  const dispatch = useDispatch();
  const [addressForOrder, setAddressForOrder] = useState(null);

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

  // well well well, is this want we want at the end or just a dirty hack?
  const onStartOrder = () => {
    import('@/restaurant/saga').then((mod) => {
      injectSaga('rest', mod.restaurantSaga);

      dispatch(fetchRestaurantByGeo({ lat: 0, lng: 0 }))
      dispatch(startOrder({ restaurant: {}, address: addressForOrder }));
    });
  };

  const onAddProduct = (p) => {
    dispatch(addProduct({
      id: p.id,
      name: p.name,
      price: p.price,
    }));
  };

  return (
    <div>
      {!isStarted &&
        <AddressSearch onChooseAddress={setAddressForOrder} current={addressForOrder} />
      }
      {!isStarted && (
        <button disabled={!addressForOrder} onClick={onStartOrder}>
          Begin order
        </button>
      )}
      <Menu
        canAddProduct={isStarted}
        canCustomizeProduct={isStarted}
        onAddProduct={onAddProduct}
        onCustomizeProduct={onCustomizeProduct}
      />
      {productForCustomize && <CustomizeProduct product={productForCustomize} onClose={closeModal} />}
    </div>
  );
}
