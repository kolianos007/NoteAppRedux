import {
  AUTH_LOGOUT,
  AUTH_SUCCESS,
  AUTH_LOADED,
  AUTH_ERROR,
} from "../actions/actionTypes";

const initialState = {
  token: null,
  loading: false,
  error: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOADED:
      return {
        ...state,
        loading: true,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        token: action.idToken,
        loading: false,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        loading: false,
      };
    case AUTH_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default authReducer;
