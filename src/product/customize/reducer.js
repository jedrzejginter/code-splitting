import { REQUEST_PRODUCT, RESET_PRODUCT, SET_CONFIG } from "./actions";

const initialState = {
  product: null,
  config: [],
};

export function productReducer(s = initialState, a) {
  if (a.type === RESET_PRODUCT) {
    return initialState;
  }

  if (a.type === REQUEST_PRODUCT) {
    return { ...s, product: a.payload.product };
  }

  if (a.type === SET_CONFIG) {
    return { ...s, config: a.payload.config };
  }

  return s;
}
