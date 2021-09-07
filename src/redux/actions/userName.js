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
    const uid = localStorage.getItem("localId");
    const authTok = localStorage.getItem("idToken");
    await axios
      .put(
        `https://appnoteredux-55ec0-default-rtdb.firebaseio.com/users/${uid}.json?auth=${authTok}`,
        { name }
      )
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        localStorage.setItem("nameNoteApp", data.name);
      });
    await axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCiEqKYajHZOShxkFxvEJYXoEy-hdv2fNc",
        { idToken: authTok, displayName: name }
      )
      .then((response) => console.log(response));
    dispatch(setName(name));
  };
};

export { setName, postName };
