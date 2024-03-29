import axios from "axios";
import {
  GET_NOTES_LOADED,
  GET_NOTES_SUCCESS,
  GET_NOTES_ERROR,
  EDIT_NOTE,
  SAVE_EDIT_NOTE,
  DELETE_NOTE,
  LIKE_NOTE,
  READY_NOTE,
  VISIBLE_BLOCK_NOTES,
  FILTER_BY_DATE,
  SET_NOTE_STYLE,
  SET_SEARCH_NOTES_LIST,
  RESET_FILTER_BY_DATE,
} from "./actionTypes";

const notesLoaded = () => {
  return {
    type: GET_NOTES_LOADED,
  };
};

const notesSuccess = (notesList) => {
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

const editNote = (note) => {
  return {
    type: EDIT_NOTE,
    note,
  };
};

const saveEditNote = () => {
  return {
    type: SAVE_EDIT_NOTE,
  };
};

const deleteNote = (id, date) => {
  return {
    type: DELETE_NOTE,
    id,
    date,
  };
};

const likeNote = (id, date) => {
  return {
    type: LIKE_NOTE,
    id,
    date,
  };
};

const readyNote = (id, date) => {
  return {
    type: READY_NOTE,
    id,
    date,
  };
};

const visibleBlockNotes = (visibleBlock) => {
  return {
    type: VISIBLE_BLOCK_NOTES,
    visibleBlock,
  };
};

const filterByDate = (filterDate) => {
  return {
    type: FILTER_BY_DATE,
    filterDate,
  };
};

const setNoteStyleAction = (noteStyle) => {
  return {
    type: SET_NOTE_STYLE,
    noteStyle,
  };
};

const setSearchNotesList = (searchedNote) => {
  return {
    type: SET_SEARCH_NOTES_LIST,
    searchedNote,
  };
};

const resetFilterByDate = () => {
  return {
    type: RESET_FILTER_BY_DATE,
  };
};

const getNote = () => async (dispatch) => {
  const uid = localStorage.getItem("localId");
  const authTok = localStorage.getItem("idToken");
  dispatch(notesLoaded());
  const list = await axios
    .get(
      `https://appnoteredux-55ec0-default-rtdb.firebaseio.com/notes/${uid}.json?auth=${authTok}`
    )
    // .then((res) => dispatch(notesSuccess(res.data)))
    .then((res) => {
      if (res.data === null) {
        return null;
      }
      const filterNote =
        res.data.length > 1
          ? res.data
              .filter((e) => e)
              .sort((a, b) => a.date - b.date)
              .map((el, i, arr) => {
                // eslint-disable-next-line no-param-reassign
                arr[i].id = i;
                // eslint-disable-next-line no-param-reassign
                arr[i].notesList = el.notesList.filter((e) => e);
                return el;
              })
          : res.data;
      // dispatch(notesSuccess(filterNote));
      return filterNote;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });

  let notesList;
  if (list) {
    notesList = await axios
      .put(
        `https://appnoteredux-55ec0-default-rtdb.firebaseio.com/notes/${uid}.json?auth=${authTok}`,
        { ...list }
      )
      .then((res) => dispatch(notesSuccess(res.data)))
      .catch((err) => dispatch(notesError(err)));
  } else {
    dispatch(notesSuccess(null));
  }

  return notesList;
};

const editNoteRequest = (note) => async (dispatch, getState) => {
  const uid = localStorage.getItem("localId");
  const authTok = localStorage.getItem("idToken");
  dispatch(editNote(note));
  dispatch(saveEditNote());

  await axios.put(
    `https://appnoteredux-55ec0-default-rtdb.firebaseio.com/notes/${uid}.json?auth=${authTok}`,
    getState().notes.notesList
  );
};

const deleteNoteRequest = (id, date) => async (dispatch, getState) => {
  const uid = localStorage.getItem("localId");
  const authTok = localStorage.getItem("idToken");
  dispatch(deleteNote(id, date));

  await axios.put(
    `https://appnoteredux-55ec0-default-rtdb.firebaseio.com/notes/${uid}.json?auth=${authTok}`,
    getState().notes.notesList
  );
};

const likeNoteRequest = (id, date) => async (dispatch, getState) => {
  const uid = localStorage.getItem("localId");
  const authTok = localStorage.getItem("idToken");
  dispatch(likeNote(id, date));

  await axios.put(
    `https://appnoteredux-55ec0-default-rtdb.firebaseio.com/notes/${uid}.json?auth=${authTok}`,
    getState().notes.notesList
  );
};

const readyNoteRequest = (id, date) => async (dispatch, getState) => {
  const uid = localStorage.getItem("localId");
  const authTok = localStorage.getItem("idToken");
  dispatch(readyNote(id, date));

  await axios.put(
    `https://appnoteredux-55ec0-default-rtdb.firebaseio.com/notes/${uid}.json?auth=${authTok}`,
    getState().notes.notesList
  );
};

export {
  notesLoaded,
  notesSuccess,
  notesError,
  getNote,
  editNote,
  editNoteRequest,
  saveEditNote,
  deleteNote,
  deleteNoteRequest,
  likeNote,
  likeNoteRequest,
  readyNote,
  readyNoteRequest,
  visibleBlockNotes,
  filterByDate,
  setNoteStyleAction,
  setSearchNotesList,
  resetFilterByDate,
};
