import { SET_SINGLE_STRING_RESULTS } from './actions'

const initialState = {
  results: []
}

export function addressReducer(state = initialState, action) {
  if (action.type === SET_SINGLE_STRING_RESULTS) {
    return { results: action.payload.results };
  }

  return state;
}
