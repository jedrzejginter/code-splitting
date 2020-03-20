import { actionCreator } from '../redux/helpers';

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const REMOVE_BASKET_LINE = 'REMOVE_BASKET_LINE';
export const RESET_BASKET = 'RESET_BASKET';

export const addProduct = actionCreator(ADD_PRODUCT);
export const removeBasketLine = actionCreator(REMOVE_BASKET_LINE);
export const resetBasket = actionCreator(RESET_BASKET);
