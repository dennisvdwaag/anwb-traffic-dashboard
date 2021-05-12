import {
  SET_BOUNDS, SET_ROADS, SET_FILTER, SET_INFORMATION,
} from '../constants/action-types';

const initialState = {
  roads: null,
  bounds: null,
  filter: null,
  information: null,
};

const rootReducer = (state = initialState, action) => {
  const newState = { ...state };

  if (action.type === SET_BOUNDS) {
    newState.bounds = action.payload;
  }

  if (action.type === SET_ROADS) {
    newState.roads = action.payload;
  }

  if (action.type === SET_FILTER) {
    newState.filter = action.payload;
  }

  if (action.type === SET_INFORMATION) {
    newState.information = action.payload;
  }

  return newState;
};

export default rootReducer;
