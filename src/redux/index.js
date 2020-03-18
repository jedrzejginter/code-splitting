import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

const staticReducers = {};

function* rootSaga() {}

// Configure the store
// runSaga is middleware.run function
// rootSaga is a your root saga for static saagas
type Saga = () => Generator<never, void, undefined>;
type Reducer = <T, A>(is: T, a: A) => T;

function createSagaInjector(runSaga: (saga: Saga) => void, rootSaga: Saga) {
  // Create a dictionary to keep track of injected sagas
  const injectedSagas = new Map();

  const isInjected = (key: string): boolean => injectedSagas.has(key);

  const injectSaga = (key: string, saga: Saga) => {
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
  const asyncReducers: Record<string, Reducer> = {};

  // Add sagas middleware
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = applyMiddleware(sagaMiddleware);
  const store: Store = createStore(createReducer(asyncReducers), composeWithDevTools(middlewares));

  return {
    // Redux store instance.
    store,
    // Register async saga.
    injectSaga: createSagaInjector(sagaMiddleware.run, rootSaga),
    // Register async reducer.
    injectReducer: (key: string, reducer: Reducer) => {
      asyncReducers[key] = reducer;
      store.replaceReducer(createReducer(asyncReducers));
    },
  };
}

function createReducer(asyncReducers: Record<string, Reducer>) {
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
