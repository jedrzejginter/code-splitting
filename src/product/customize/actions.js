import { actionCreator } from "../../redux/helpers";

export const REQUEST_PRODUCT = 'REQUEST_PRODUCT';
export const FETCH_REQUEST = 'FETCH_REQUEST';
export const RESET_PRODUCT = 'RESET_PRODUCT';
export const SET_CONFIG = 'SET_CONFIG';

export const requestProduct = actionCreator(REQUEST_PRODUCT);
export const fetchProduct = actionCreator(FETCH_REQUEST);
export const resetProduct = actionCreator(RESET_PRODUCT);
export const setConfig = actionCreator(SET_CONFIG);
