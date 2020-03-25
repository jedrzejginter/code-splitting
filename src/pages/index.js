import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { injectSaga } from '@/redux';
import { actionCreator } from '@/redux/helpers';
import { isBrowser } from '@/utils';
import { moduleMiddleware } from '@/module';

import { addProduct } from '@/features/basket/actions';
import { getBasketLines } from '@/features/basket/selectors';
import { startOrder } from '@/features/order/actions';
import { getIsOrderStarted, getAddressForOrder } from '@/features/order/selectors';
import Menu from '@/features/menu';
import { fetchDefaultMenu } from '@/features/menu/actions';
import AddressSearch from '@/features/address';
import { requestProduct, resetProduct } from '@/features/product/customize/actions';
import { getProductForCustomize } from '@/features/product/customize/selectors';
import { fetchRestaurantByGeo } from '@/features/restaurant/actions';

const CustomizeProduct = dynamic(
  () => import('@/features/product/customize').then(moduleMiddleware('product')),
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
    import('@/features/restaurant/saga').then((mod) => {
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
