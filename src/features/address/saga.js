import { all, call, put, takeLatest } from 'redux-saga/effects';

import { getSingleString } from "./single-string";
import { SINGLE_STRING, setSingleStringResults } from "./actions";

export function* addressSaga() {
  yield all([
    takeLatest(SINGLE_STRING, function*(action) {
      const r = yield call(getSingleString, { query: action.payload.query });

      if (r && r.data && r.data.addresses) {
        yield put(setSingleStringResults({ results: r.data.addresses }));
      }
    })
  ]);
}
