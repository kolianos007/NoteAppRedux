import { CREATE_NOTE, REZET_NOTE } from "../actions/actionTypes";

const initialState = {
  note: [],
};

const createNoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NOTE:
      return {
        ...state,
        note: action.note,
      };
    case REZET_NOTE:
      return {
        ...state,
        note: [],
      };
    default: {
      return state;
    }
  }
};

export default createNoteReducer;
