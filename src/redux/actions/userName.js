import axios from "axios";
import { SET_NAME } from "./actionTypes";

const setName = (name) => {
  return {
    type: SET_NAME,
    name,
  };
};

const postName = (name) => {
  return async (dispatch) => {
    // const uid = localStorage.getItem("localId");
    const authTok = localStorage.getItem("idToken");
    // await axios
    //   .put(
    //     `https://appnoteredux-55ec0-default-rtdb.firebaseio.com/users/${uid}.json?auth=${authTok}`,
    //     { name }
    //   )
    //   .then((response) => {
    //     return response.data;
    //   })
    //   .then((data) => {
    //     localStorage.setItem("nameNoteApp", data.name);
    //   });
    const displayName = await axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCiEqKYajHZOShxkFxvEJYXoEy-hdv2fNc",
        { idToken: authTok, displayName: name }
      )
      .then((response) => response.data)
      .then((data) => data.displayName);

    if (displayName && displayName !== undefined) {
      console.log("ddddddddddddddd", displayName);
      localStorage.setItem("nameNoteApp", displayName);
      dispatch(setName(displayName));
    } else {
      // сделать логику всплывашки что нужно ввести имя еще раз так как возникла ошибка
    }
  };
};

export { setName, postName };
