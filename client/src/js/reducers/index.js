import { SET_BOUNDS, SET_ROADS } from '../constants/action-types';

const initialState = {
  roads: null,
  bounds: null
};

function rootReducer(state = initialState, action) {
  if (action.type === SET_BOUNDS) {
    state.bounds = action.payload;
  }

  if (action.type === SET_ROADS) {
    state.roads = action.payload;
  }

  return state;
};

export default rootReducer;