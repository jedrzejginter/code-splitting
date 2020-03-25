import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Provider, useSelector } from 'react-redux';

import { moduleMiddleware } from '@/module';
import { store } from '@/redux';

import { getAddressForOrder, getIsOrderStarted } from '@/features/order/selectors';

const Basket = dynamic(() => import("@/features/basket").then(moduleMiddleware('basket')), { ssr: false });

function WrappedBasket() {
  const isStarted = useSelector(getIsOrderStarted);
  const address = useSelector(getAddressForOrder);
  const { pathname } = useRouter();

  const hasButton = pathname !== '/checkout';
  const hasDeletion = pathname !== '/checkout';

  return isStarted ? <Basket address={address ? address.name : undefined } hasDeletion={hasDeletion} hasButton={hasButton} /> : null;
}

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Link as="/" href="/index"><a>Home</a></Link> |{' '}
      <Link as="/checkout" href="/checkout"><a>Checkout page</a></Link>
      <WrappedBasket />
      <Component {...pageProps} />
    </Provider>
  )
}
