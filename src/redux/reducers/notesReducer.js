/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import {
  GET_NOTES_LOADED,
  GET_NOTES_SUCCESS,
  GET_NOTES_ERROR,
  EDIT_NOTE,
  SAVE_EDIT_NOTE,
  DELETE_NOTE,
} from "../actions/actionTypes";

const initialState = {
  notesList: [],
  note: {},
  visibleBlock: 2,
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
          let dateBlock;
          if (el.date === state.note.date) {
            dateBlock = el.notesList.map((elem) => {
              if (elem.id === state.note.id) {
                return { ...elem, ...state.note };
              }
              return elem;
            });
            // eslint-disable-next-line no-param-reassign
            el.notesList = dateBlock;
          }
          return el;
        }),
      };
    case DELETE_NOTE:
      return {
        ...state,
        note: action.note,
        notesList: state.notesList.map((el) => {
          let dateBlock;
          if (el.date === state.note.date) {
            dateBlock = el.notesList
              .map((elem) => {
                if (elem.id === state.note.id) {
                  return null;
                }
                return elem;
              })
              .filter((e) => e);
            // eslint-disable-next-line no-param-reassign
            el.notesList = dateBlock;
          }
          return el;
        }),
      };
    default:
      return state;
  }
};

export default notesReducer;
