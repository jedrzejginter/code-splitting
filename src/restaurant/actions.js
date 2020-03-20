import { actionCreator } from "../redux/helpers";

export const FETCH_RESTAURANT_GEO = 'FETCH_RESTAURANT_GEO';

export const fetchRestaurantByGeo = actionCreator(FETCH_RESTAURANT_GEO);
