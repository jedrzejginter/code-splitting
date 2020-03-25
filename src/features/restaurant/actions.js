import { actionCreator } from "@/redux/actions";

export const FETCH_RESTAURANT_GEO = 'FETCH_RESTAURANT_GEO';

export const fetchRestaurantByGeo = actionCreator(FETCH_RESTAURANT_GEO);
