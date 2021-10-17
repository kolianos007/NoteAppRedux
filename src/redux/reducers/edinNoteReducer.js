import { EDIT_NOTE } from "../actions/actionTypes";

const initialState = {
  note: [],
};

const editNoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_NOTE:
      return {
        ...state,
        note: action.note,
      };
    default: {
      return state;
    }
  }
};

export default editNoteReducer;
