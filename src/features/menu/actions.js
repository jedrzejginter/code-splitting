import { actionCreator } from "@/redux/actions";

export const SET_MENU = 'SET_MENU';
export const FETCH_DEFAULT_MENU = 'FETCH_DEFAULT_MENU';

export const setMenu = actionCreator(SET_MENU);
export const fetchDefaultMenu = actionCreator(FETCH_DEFAULT_MENU);
