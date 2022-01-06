import { INITIALIZED_SUCCESS } from "./actionTypes";
// import { autoLogin } from "./auth";

const intitializedSuccess = (initialized) => {
  return {
    type: INITIALIZED_SUCCESS,
    initialized,
  };
};

const initializedApp = () => async (dispatch) => {
  const idToken = localStorage.getItem("idToken");
  idToken
    ? dispatch(intitializedSuccess(true))
    : dispatch(intitializedSuccess(false));
};

export { intitializedSuccess, initializedApp };
