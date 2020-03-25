import { all, call, put, takeLatest } from "redux-saga/effects";

// DON'T LIKE THAT
// It looks we have a problem with responsibility separation
import { setMenu } from "../actions";

import { getDefaultMenu } from './get-default-menu';

export default function* defaultMenuSaga() {
  yield all([
    takeLatest('FETCH_DEFAULT_MENU', function* () {
      const r = yield call(getDefaultMenu);

      if (r.menu) {
        yield put(setMenu({ menu: r.menu }));
      }
    }),
  ]);
}
