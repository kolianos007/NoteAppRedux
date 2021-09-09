import { AUTH_LOGOUT, AUTH_SUCCESS, AUTH_LOADED } from "../actions/actionTypes";

const initialState = {
  token: null,
  loading: false,
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
    default:
      return state;
  }
};

export default authReducer;
