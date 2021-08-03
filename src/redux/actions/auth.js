import axios from "axios";
import { AUTH_SUCCESS, AUTH_LOGOUT } from "./actionTypes";

const authSuccess = (idToken) => {
  return {
    type: AUTH_SUCCESS,
    idToken,
  };
};

const logout = () => {
  localStorage.removeItem("idToken");
  localStorage.removeItem("localId");
  localStorage.removeItem("expiresIn");
  return {
    type: AUTH_LOGOUT,
  };
};

const autoLogout = (time) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, time * 1000);
  };
};

const autoLogin = () => {
  return (dispatch) => {
    const token = localStorage.getItem("idToken");
    if (!token) {
      dispatch(logout());
    } else {
      const expiresData = new Date(localStorage.getItem("expiresIn"));
      if (expiresData <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));
        dispatch(
          autoLogout((expiresData.getTime() - new Date().getTime()) / 1000)
        );
      }
    }
  };
};

const auth = (email, password, isLogin) => {
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
    const {
      data: { idToken, localId, expiresIn },
    } = response;

    const expiresData = new Date(new Date().getTime() + expiresIn * 1000);

    localStorage.setItem("idToken", idToken);
    localStorage.setItem("localId", localId);
    localStorage.setItem("expiresIn", expiresData);

    dispatch(authSuccess(idToken));
    dispatch(autoLogout(expiresIn));
  };
};

export { auth, autoLogout, logout, authSuccess, autoLogin };
