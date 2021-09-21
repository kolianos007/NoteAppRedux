import { INITIALIZED_SUCCESS } from "./actionTypes";
// import { autoLogin } from "./auth";

const intitializedSuccess = () => {
  return {
    type: INITIALIZED_SUCCESS,
  };
};

const initializedApp = () => (dispatch) => {
  // нужно делать запрос на сервер и если возвращается tokenId тогда инициалищировать
  // const token = dispatch(autoLogin());
  // console.log("tttttttttttttt", token);
  // if (token) {
  //   dispatch(intitializedSuccess());
  // }
  console.log(dispatch);
};

export { intitializedSuccess, initializedApp };
