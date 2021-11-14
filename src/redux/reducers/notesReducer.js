/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
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
} from "../actions/actionTypes";

const initialState = {
  notesList: [],
  note: {},
  filterDate: null,
  visibleBlock: 2,
  loading: false,
  error: false,
  noteStyle: null,
  searchedNote: null,
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
        notesList: state.notesList
          .map((el) => {
            let dateBlock;
            if (el.date === action.date) {
              if (el.notesList.length === 1) {
                return null;
              }
              dateBlock = el.notesList
                .map((elem) => {
                  if (elem.id === action.id) {
                    return null;
                  }
                  return elem;
                })
                .filter((e) => e);
              // eslint-disable-next-line no-param-reassign
              el.notesList = dateBlock;
            }
            return el;
          })
          .filter((e) => e),
      };
    case LIKE_NOTE:
      return {
        ...state,
        notesList: state.notesList.map((el) => {
          let likeBlock;
          if (el.date === action.date) {
            likeBlock = el.notesList.map((elem) => {
              if (elem.id === action.id) {
                // eslint-disable-next-line no-param-reassign
                elem.liked = !elem.liked;
              }
              return elem;
            });
            // eslint-disable-next-line no-param-reassign
            el.notesList = likeBlock;
          }
          return el;
        }),
      };
    case READY_NOTE:
      return {
        ...state,
        notesList: state.notesList.map((el) => {
          let likeBlock;
          if (el.date === action.date) {
            likeBlock = el.notesList.map((elem) => {
              if (elem.id === action.id) {
                // eslint-disable-next-line no-param-reassign
                elem.ready = !elem.ready;
              }
              return elem;
            });
            // eslint-disable-next-line no-param-reassign
            el.notesList = likeBlock;
          }
          return el;
        }),
      };
    case VISIBLE_BLOCK_NOTES:
      return {
        ...state,
        visibleBlock: action.visibleBlock,
      };
    case FILTER_BY_DATE:
      return {
        ...state,
        filterDate: action.filterDate,
      };
    case SET_NOTE_STYLE:
      return {
        ...state,
        noteStyle: action.noteStyle,
      };
    case SET_SEARCH_NOTES_LIST:
      return {
        ...state,
        searchedNote: action.searchedNote,
      };
    case RESET_FILTER_BY_DATE:
      return {
        ...state,
        filterDate: null,
      };
    default:
      return state;
  }
};

export default notesReducer;
