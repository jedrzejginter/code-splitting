import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';

import { addressReducer } from '@/features/address/reducer';
import { addressSaga } from '@/features/address/saga';
import defaultMenuSaga from '@/features/menu/saga';
import { reducer as menuReducer } from '@/features/menu/reducer';
import { reducer as orderReducer } from '@/features/order';
import { productReducer } from '@/features/product/customize/reducer';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch {
    // ignore write errors
  }
};

const staticReducers = {
  address: addressReducer,
  menu: menuReducer,
  order: orderReducer,
  product: productReducer,
};

function* rootSaga() {
  yield all([
    fork(addressSaga),
    fork(defaultMenuSaga),
  ]);
}

// Configure the store
// runSaga is middleware.run function
// rootSaga is a your root saga for static saagas
// type Saga = () => Generator<never, void, undefined>;
// type Reducer = <T, A>(is: T, a: A) => T;

function createSagaInjector(runSaga, rootSaga) {
  // Create a dictionary to keep track of injected sagas
  const injectedSagas = new Map();

  const isInjected = (key) => injectedSagas.has(key);

  const injectSaga = (key, saga) => {
    // We won't run saga if it is already injected
    if (isInjected(key)) return;

    // Sagas return task when they executed, which can be used
    // to cancel them
    const task = runSaga(saga);

    // Save the task if we want to cancel it in the future
    injectedSagas.set(key, task);
  };

  // Inject the root saga as it a staticlly loaded file,
  injectSaga('root', rootSaga);

  return injectSaga;
}

// Our previously defined method for reducers injection
function configureStore() {
  const asyncReducers = {};
  const persistedStates = {};

  const initState = loadState();

  for (const k in initState) {
    if (!(k in staticReducers)) {
      persistedStates[k] = initState[k];
      delete initState[k];
    }
  }


  // Add sagas middleware
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = applyMiddleware(sagaMiddleware);
  const store = createStore(createReducer(asyncReducers), initState, composeWithDevTools(middlewares));

  store.subscribe(() => {
    const currState = store.getState();

    saveState({
      basket: currState.basket,
      order: currState.order,
      payments: currState.payments,
    });
  });

  return {
    // Redux store instance.
    store,
    // Register async saga.
    injectSaga: createSagaInjector(sagaMiddleware.run, rootSaga),
    // Register async reducer.
    injectReducer: (key, reducer) => {
      asyncReducers[key] = (s, a) => {
        const ps = persistedStates[key];
        return reducer(s || ps, a)
      };
      store.replaceReducer(createReducer(asyncReducers));
    },
  };
}

function createReducer(asyncReducers) {
  return combineReducers({
    ...staticReducers,
    ...asyncReducers,
  });
}

const { store, injectReducer, injectSaga } = configureStore();

export {
  store,
  injectReducer,
  injectSaga,
}
