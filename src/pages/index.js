import dynamic from 'next/dynamic';
import { useState } from 'react';

import { wrapProduct } from '../basket-v2/utils';

const runners = {};
// const loaders = {
//   checkout: () => import('../checkout'),
// };

function fakeRunner() {
  console.log('%cFAKE RUNNER :f', 'color: orange');
}

function registerRunner(r, id) {
  runners[id] = r;
  console.log('registered worker ' + id);
}

function getRunner(id) {
  return runners[id] || fakeRunner;
}

function fireRunner(id, ...args) {
  const runner = getRunner(id);

  if (runner !== fakeRunner) {
    return runner(...args);
  }

  // problem:
  // we could register it manually first here,
  // but how do we know what module actually exports runner for 'id'?
  // so we don't know what module to `import(..)`
  //
  // maybe we could use predefined 'loader' object
  // that includes dynamic imports?
  //
  //    const loaders = {
  //      checkout: () => import('../checkout'),
  //      ...
  //    };
  console.error('Runner ' +id+ ' not registered yet');
}

function scheduler(act) {
  switch (act) {
    case 'evaluate-basket': {
      fireRunner('basket', { anotherWorker: getRunner('checkout') });
      break;
    }
  }
}

function moduleMiddleware(id) {
  return (mod) => {
    if (mod && mod.default && mod.default.logic) {
      console.log('registering logic for module ' + id);
      registerRunner(mod.default.logic, id);
    }

    return mod;
  }
}

const Basket = dynamic(() => import("../basket-v2").then(moduleMiddleware('basket')), { ssr: false });
const Checkout = dynamic(() => import("../checkout").then(moduleMiddleware('checkout')), { ssr: false });

export default function Home() {
  const [state, setState] = useState(0);

 return (
    <div>
      <code>{JSON.stringify(wrapProduct({ name: 'p' }), null, 2)}</code>
      <button onClick={() => setState(state + 1)}>Load next module</button>
      <button onClick={() => scheduler('evaluate-basket')}>
        Try running basket
      </button>
      {state > 0 && <Basket />}
      {state > 1 && <Checkout />}
    </div>
  );
}
