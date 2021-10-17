import { EDIT_NOTE } from "./actionTypes";

const editNote = (note) => {
  return {
    type: EDIT_NOTE,
    note,
  };
};

export { editNote };
