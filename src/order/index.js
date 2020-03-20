import { START_ORDER, SUBMIT_ORDER } from "./actions";

const initialState = {
  address: null,
  started: false,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case START_ORDER: {
      return { ...state, started: true, address: action.payload.address };
    }
    case SUBMIT_ORDER: {
      return initialState;
    }
  }

  return state;
}
