import { actionCreator } from '@/redux/helpers';

export const SINGLE_STRING = 'SINGLE_STRING';
export const SET_SINGLE_STRING_RESULTS = 'SET_SINGLE_STRING_RESULTS';

export const singleStringSearch = actionCreator(SINGLE_STRING);
export const setSingleStringResults = actionCreator(SET_SINGLE_STRING_RESULTS);
