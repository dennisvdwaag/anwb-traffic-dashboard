import { SET_BOUNDS, SET_ROADS, SET_FILTER, SET_INFORMATION } from '../constants/action-types';

export const setBounds = (payload) => {
  return { type: SET_BOUNDS, payload }
};

export const setRoads = (payload) => {
  return { type: SET_ROADS, payload }
};

export const setFilter = (payload) => {
  return { type: SET_FILTER, payload }
};

export const setInformation = (payload) => {
  return { type: SET_INFORMATION, payload }
};