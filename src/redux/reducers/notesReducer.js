/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import {
  GET_NOTES_LOADED,
  GET_NOTES_SUCCESS,
  GET_NOTES_ERROR,
  EDIT_NOTE,
} from "../actions/actionTypes";

const initialState = {
  notesList: [],
  note: {},
  loading: false,
  error: false,
};

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTES_LOADED:
      return {
        ...state,
        loading: true,
      };
    case GET_NOTES_SUCCESS:
      return {
        ...state,
        loading: false,
        notesList: action.notesList,
      };
    case GET_NOTES_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        notesList: [],
      };
    case EDIT_NOTE:
      return {
        ...state,
        note: action.note,
        notesList: state.notesList.map((el) => {
          console.log("DATEDATEDATE", el.date, action.note);
          if (el.date === action.note.date) {
            el.notesList.map((elem) => {
              console.log("IDIDIDIDIDIDI", elem.id, action.note.id);
              if (elem.id === action.note.id) {
                console.log("ACTIONNOTE", { ...action.note });
                return { ...elem, ...action.note };
              }
              return el;
            });
          }
          return el;
        }),
      };
    default:
      return state;
  }
};

export default notesReducer;
