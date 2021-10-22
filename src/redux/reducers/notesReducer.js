/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import {
  GET_NOTES_LOADED,
  GET_NOTES_SUCCESS,
  GET_NOTES_ERROR,
  EDIT_NOTE,
  SAVE_EDIT_NOTE,
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
      };
    case SAVE_EDIT_NOTE:
      return {
        ...state,
        notesList: state.notesList.map((el) => {
          // console.log("DATEDATEDATE", el.date, state.note);
          let q;
          if (el.date === state.note.date) {
            q = el.notesList.map((elem) => {
              // console.log("IDIDIDIDIDIDI", elem.id, state.note.id);
              if (elem.id === state.note.id) {
                // console.log("ACTIONNOTE", { ...elem, ...state.note });
                return { ...elem, ...state.note };
              }
              console.log("elem", elem);
              return elem;
            });
            // eslint-disable-next-line no-param-reassign
            el.notesList = q;
          }
          // eslint-disable-next-line no-debugger
          // debugger;
          // eslint-disable-next-line no-param-reassign

          console.log(q);
          console.log("el", el);
          return el;
        }),
      };
    default:
      return state;
  }
};

export default notesReducer;
