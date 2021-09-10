import { SET_NAME, CLEAN_NAME } from "../actions/actionTypes";

const initialState = {
  name: null,
};

const userNameReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NAME:
      return {
        ...state,
        name: action.name,
      };
    case CLEAN_NAME:
      return {
        ...state,
        name: null,
      };
    default:
      return state;
  }
};

export default userNameReducer;
