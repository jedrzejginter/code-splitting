import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Provider, useSelector } from 'react-redux';

import { moduleMiddleware } from '@/module';
import { store } from '@/redux';

import { getIsOrderStarted } from '@/features/order/selectors';

const Basket = dynamic(() => import("@/features/basket").then(moduleMiddleware('basket')), { ssr: false });

function WrappedBasket() {
  const isStarted = useSelector(getIsOrderStarted);
  const { pathname } = useRouter();

  const hasButton = pathname !== '/checkout';
  const hasDeletion = pathname !== '/checkout';
  return isStarted ? <Basket hasDeletion={hasDeletion} hasButton={hasButton} /> : null;
}

// This default export is required in a new `pages/_app.js` file.
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
