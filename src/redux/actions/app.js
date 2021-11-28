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

// const initializedApp = () => (dispatch) => {
//   // нужно делать запрос на сервер и если возвращается tokenId тогда инициалищировать
//   // const token = dispatch(autoLogin());
//   // console.log("tttttttttttttt", token);
//   // if (token) {
//   //   dispatch(intitializedSuccess());
//   // }
//   console.log(dispatch);
// };

export { intitializedSuccess, initializedApp };
