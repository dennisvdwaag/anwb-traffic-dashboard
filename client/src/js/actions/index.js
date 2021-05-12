import {
  SET_BOUNDS, SET_ROADS, SET_FILTER, SET_INFORMATION,
} from '../constants/action-types';

export const setBounds = (payload) => ({ type: SET_BOUNDS, payload });

export const setRoads = (payload) => ({ type: SET_ROADS, payload });

export const setFilter = (payload) => ({ type: SET_FILTER, payload });

export const setInformation = (payload) => ({ type: SET_INFORMATION, payload });
