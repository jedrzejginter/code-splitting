import { actionCreator } from '../redux/helpers';

export const START_ORDER = 'START_ORDER';
export const SUBMIT_ORDER = 'SUBMIT_ORDER';

export const startOrder = actionCreator(START_ORDER);
export const submitOrder = actionCreator(SUBMIT_ORDER);
