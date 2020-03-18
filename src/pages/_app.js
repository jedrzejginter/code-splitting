import Link from 'next/link';
import { Provider } from 'react-redux';

import { store } from '../redux';

import '../styles.css'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Link as="/" href="/index"><a>Home</a></Link> |{' '}
      <Link as="/checkout" href="/checkout"><a>Checkout page</a></Link>
      <Component {...pageProps} />
    </Provider>
  )
}
