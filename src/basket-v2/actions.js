import { actionCreator } from '../redux/helpers';

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const RESET_BASKET = 'RESET_BASKET';

export const addProduct = actionCreator(ADD_PRODUCT);
export const resetBasket = actionCreator(RESET_BASKET);
