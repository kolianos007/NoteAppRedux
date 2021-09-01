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
    console.log("uid", uid);
    await axios
      .put(
        // `https://appnoteredux-55ec0-default-rtdb.firebaseio.com/users/${uid}.json`,
        `https://appnoteredux-55ec0-default-rtdb.firebaseio.com/users/${uid}.json?auth=${authTok}`,
        { name }
      )
      .then((data) => console.log(data));
    dispatch(setName(name));
  };
};

export { setName, postName };
