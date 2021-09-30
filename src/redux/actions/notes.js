import axios from "axios";
import {
  GET_NOTES_LOADED,
  GET_NOTES_SUCCESS,
  GET_NOTES_ERROR,
} from "./actionTypes";

const notesLoaded = () => {
  return {
    type: GET_NOTES_LOADED,
  };
};

const notesSuccess = (notesList) => {
  console.log("NOTESLIST", notesList);
  return {
    type: GET_NOTES_SUCCESS,
    notesList,
  };
};

const notesError = () => {
  return {
    type: GET_NOTES_ERROR,
  };
};

const getNote = () => async (dispatch) => {
  const uid = localStorage.getItem("localId");
  const authTok = localStorage.getItem("idToken");
  dispatch(notesLoaded());
  const notesList = await axios
    .get(
      `https://appnoteredux-55ec0-default-rtdb.firebaseio.com/notes/${uid}.json?auth=${authTok}`
    )
    // .then((res) => dispatch(notesSuccess(res.data)))
    .then((res) => dispatch(notesSuccess(res.data)))
    .catch((err) => dispatch(notesError(err)));

  return notesList;
};

export { notesLoaded, notesSuccess, notesError, getNote };
