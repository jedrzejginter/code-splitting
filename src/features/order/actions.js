import { actionCreator } from '@/redux/actions';

export const START_ORDER = 'START_ORDER';
export const SUBMIT_ORDER = 'SUBMIT_ORDER';

export const startOrder = actionCreator(START_ORDER);
export const submitOrder = actionCreator(SUBMIT_ORDER);
