import { START_ORDER, SUBMIT_ORDER } from "./actions";

const initialState = {
  address: null,
  restaurant: null,
  started: false,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case START_ORDER: {
      return {
        ...state,
        started: true,
        restaurant: action.payload.restaurant,
        address: action.payload.address,
      };
    }
    case SUBMIT_ORDER: {
      return initialState;
    }
  }

  return state;
}
