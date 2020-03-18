import { injectSaga, injectReducer } from '../redux';

export function moduleMiddleware(id) {
  return (mod) => {
    if (mod && mod.default) {
      if (mod.default.reducer) {
        injectReducer(id, mod.default.reducer);
        console.log('registering reducer for module ' + id);
      }

      if (mod.default.sagas && mod.default.sagas.root) {
        injectSaga(id, mod.default.sagas.root);
        console.log('registering saga for module ' + id);
      }
    }

    return mod;
  }
}
