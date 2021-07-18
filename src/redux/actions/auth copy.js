import axios from "axios";
// import { AUTH_LOGOUT, AUTH_SUCCESS } from "./actionCreators";

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expiresData");
  return {
    type: AUTH_LOGOUT,
  };
};

export const autoLogout = (time) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, time * 1000);
  };
};

export const authSuccess = (token) => {
  return {
    type: AUTH_SUCCESS,
    token,
  };
};

export const auth = (email, password, isLogin) => {
  return async (dispatch) => {
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };

    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCiEqKYajHZOShxkFxvEJYXoEy-hdv2fNc";

    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCiEqKYajHZOShxkFxvEJYXoEy-hdv2fNc";
    }

    const response = await axios.post(url, authData);
    const { data } = response;

    const experationDate = new Date(
      new Date().getTime() + data.expiresIn * 1000
    );

    console.log(1);
    localStorage.setItem("token", data.idToken);
    localStorage.setItem("userId", data.localId);
    localStorage.setItem("expiresData", experationDate);
    console.log(2);
    dispatch(authSuccess(data.idToken));
    dispatch(autoLogout(data.expiresIn));
  };
};

export const autoLogin = () => {
  return (dispatch) => {
    const idToken = localStorage.getItem("token");
    if (!idToken) {
      dispatch(logout());
    } else {
    }
  };
};
