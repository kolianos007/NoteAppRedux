import axios from "axios";
import {
  AUTH_LOADED,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  CLEAN_NAME,
  AUTH_ERROR,
} from "./actionTypes";

const authLoaded = () => {
  return {
    type: AUTH_LOADED,
  };
};

const authSuccess = (idToken) => {
  return {
    type: AUTH_SUCCESS,
    idToken,
  };
};

const authFailed = (error) => {
  return {
    type: AUTH_ERROR,
    error,
  };
};

const cleanStateNameLogout = () => {
  return {
    type: CLEAN_NAME,
  };
};

const logout = () => {
  localStorage.removeItem("idToken");
  localStorage.removeItem("localId");
  localStorage.removeItem("expiresIn");
  localStorage.removeItem("nameNoteApp");
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
      dispatch(cleanStateNameLogout());
    } else {
      const expiresData = new Date(localStorage.getItem("expiresIn"));
      if (expiresData <= new Date()) {
        dispatch(logout());
        dispatch(cleanStateNameLogout());
      } else {
        dispatch(authSuccess(token));
        dispatch(
          autoLogout((expiresData.getTime() - new Date().getTime()) / 1000)
        );
      }
    }
    return token;
  };
};

const auth = (email, password, isLogin) => {
  return async (dispatch) => {
    dispatch(authLoaded());
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
    const response = await axios
      .post(url, authData)
      .catch((error) => dispatch(authFailed(error)));

    if (response.error) {
      return response;
    }
    const {
      data: { idToken, localId, expiresIn, displayName },
    } = response;

    const expiresData = new Date(new Date().getTime() + expiresIn * 1000);

    localStorage.setItem("idToken", idToken);
    localStorage.setItem("localId", localId);
    localStorage.setItem("expiresIn", expiresData);
    if (displayName) {
      localStorage.setItem("nameNoteApp", displayName);
    }

    dispatch(authSuccess(idToken));
    dispatch(autoLogout(expiresIn));

    return response;
  };
};

export { auth, autoLogout, logout, authSuccess, autoLogin };
