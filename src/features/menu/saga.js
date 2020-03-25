import { all, call, put, takeLatest } from "redux-saga/effects";

import { getDefaultMenu } from './default-menu/get-default-menu';

import { setMenu } from "./actions";

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
