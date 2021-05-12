import {
  SET_BOUNDS, SET_ROADS, SET_FILTER, SET_INFORMATION,
} from '../constants/action-types';

const initialState = {
  roads: null,
  bounds: null,
  filter: null,
  information: null,
};

function rootReducer(state = initialState, action) {
  if (action.type === SET_BOUNDS) {
    state.bounds = action.payload;
  }

  if (action.type === SET_ROADS) {
    state.roads = action.payload;
  }

  if (action.type === SET_FILTER) {
    state.filter = action.payload;
  }

  if (action.type === SET_INFORMATION) {
    state.information = action.payload;
  }

  return state;
}

export default rootReducer;
