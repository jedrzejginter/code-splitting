import { mapObject } from '@/utils';

import { SET_MENU } from './actions';
import { stripDownMenu } from './utils';

const initialState = {
  categories: {},
  products: {},
};

export function reducer(state = initialState, action) {
  if (action.type === SET_MENU) {
    const { products, categories } = stripDownMenu(action.payload.menu);

    return { ...state, categories, products };
  }

  return state;
}
