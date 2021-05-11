import { SET_BOUNDS, SET_ROADS } from '../constants/action-types';

export const setBounds = (payload) => {
  return { type: SET_BOUNDS, payload }
};

export const setRoads = (payload) => {
  return { type: SET_ROADS, payload }
};