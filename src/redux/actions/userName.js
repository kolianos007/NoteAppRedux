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
    await axios
      .post(
        "https://appnoteredux-55ec0-default-rtdb.firebaseio.com/users.json",
        { name }
      )
      .then((data) => console.log(data));
    dispatch(setName(name));
  };
};

export { setName, postName };
