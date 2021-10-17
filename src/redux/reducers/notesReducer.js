import {
  GET_NOTES_LOADED,
  GET_NOTES_SUCCESS,
  GET_NOTES_ERROR,
  EDIT_NOTE,
} from "../actions/actionTypes";

const initialState = {
  notesList: [],
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
    default:
      return state;
  }
};

export default notesReducer;
