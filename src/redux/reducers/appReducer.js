import { INITIALIZED_SUCCESS } from "../actions/actionTypes";

const initialState = {
  initialized: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: action.initialized,
      };
    default:
      return state;
  }
};

export default appReducer;
