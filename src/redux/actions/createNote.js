import axios from "axios";
import { CREATE_NOTE, REZET_NOTE } from "./actionTypes";

const createNote = (note) => {
  return {
    type: CREATE_NOTE,
    note,
  };
};

const rezetNote = () => {
  return {
    type: REZET_NOTE,
  };
};

const finishCreateNote = () => async (dispatch, getState) => {
  const uid = localStorage.getItem("localId");
  const authTok = localStorage.getItem("idToken");
  const templateNewNote = (date, id, list) => {
    return {
      date,
      id,
      notesList: [list],
    };
  };
  // const getBlock = await axios
  //   .get(
  //     `https://appnoteredux-55ec0-default-rtdb.firebaseio.com/notes/${uid}.json?auth=${authTok}`
  //   )
  //   .then((res) => res.data);
  const getBlock = JSON.parse(JSON.stringify(getState().notes.notesList));
  console.log(getBlock);
  console.log(getState());
  // const sortGetBlock = getBlock.sort((a, b) => {

  // })
  let changeId;
  const getBlockLength = getBlock ? getBlock.length : 0;
  const findDateNote = getBlock
    ? getBlock.find((el, i) => {
        // console.log(el.date);
        // console.log(getState().create.note.date);
        // console.log(
        //   "DATEDATEDATE",
        //   el.date.length,
        //   getState().create.note.date.length,
        //   el.date === getState().create.note.date
        // );

        changeId = i;
        return el.date === getState().create.note.date;
      })
    : null;
  if (findDateNote) {
    findDateNote.notesList.push(getState().create.note);
    console.log(findDateNote);
    await axios.put(
      `https://appnoteredux-55ec0-default-rtdb.firebaseio.com/notes/${uid}/${changeId}.json?auth=${authTok}`,
      findDateNote
    );
  } else {
    console.log("getBlock", getBlock);
    await axios.put(
      `https://appnoteredux-55ec0-default-rtdb.firebaseio.com/notes/${uid}/${getBlockLength}.json?auth=${authTok}`,
      templateNewNote(
        getState().create.note.date,
        getBlockLength,
        getState().create.note
      )
    );
  }
  console.log(changeId);
  console.log(findDateNote);

  // await axios.put(
  //   `https://appnoteredux-55ec0-default-rtdb.firebaseio.com/notes/${uid}/${changeId}.json?auth=${authTok}`,
  //   findDateNote
  // );
  dispatch(rezetNote());
};

export { createNote, rezetNote, finishCreateNote };
