import axios from "axios";

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

    const response = axios.post(url, authData);
    const {
      data: { idToken, localId, expiresIn },
    } = response;

    const experationData = new Date(new Date().getDate() + expiresIn * 1000);

    localStorage.setItem("idToken", idToken);
    localStorage.setItem("localId", localId);
    localStorage.setItem("idToken", idToken);
  };
};

export default auth;
