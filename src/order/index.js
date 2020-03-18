import { SUBMIT_ORDER } from "./actions";

export function reducer(state = { started: false }, action) {
  switch (action.type) {
    case 'START_ORDER': {
      return { started: true };
    }
    case SUBMIT_ORDER: {
      return { started: false };
    }
  }

  return state;
}
