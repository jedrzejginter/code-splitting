import { getRestaurantByGeolocation } from "./get-by-coords";
import { all, call, takeLatest } from "redux-saga/effects";
import { FETCH_RESTAURANT_GEO } from "./actions";

export function* restaurantSaga() {
  yield all([
    takeLatest(FETCH_RESTAURANT_GEO, function*({ payload: { lat, lng } }) {
      yield call(getRestaurantByGeolocation, { lat, lng, channel: 'DELIVERY' });
    })
  ]);
}
