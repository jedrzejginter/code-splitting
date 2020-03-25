import { SET_MENU } from './actions';
import { mapObject } from '@/utils';

const initialState = {
  categories: {},
  products: {},
};

export function reducer(state = initialState, action) {
  if (action.type === SET_MENU) {
    const menu = action.payload.menu;
    let productsMapObject = {};
    let categoriesMapObject = {};

    for (const c of menu.categories) {
      categoriesMapObject[c.id] = {
        id: c.id,
        name: c.name,
        priority: c.priority || 0,
      };

      productsMapObject = {
        ...productsMapObject,
        ...mapObject(c.products, (p, id) => ({
          _categoryId: c.id,
          _isPizza: p.productType === 3,
          _isConfigurable: p.productType !== 1,
          id,
          name: p.name,
          price: p.price,
          type: p.productType
        })),
      };
    }

    return {
      ...state,
      categories: categoriesMapObject,
      products: productsMapObject,
    };
  }

  return state;
}
