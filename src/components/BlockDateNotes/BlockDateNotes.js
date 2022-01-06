import React from "react";
import PropTypes from "prop-types";
import Note from "../Note/Note";

import s from "./BlockDateNotes.module.sass";
import convertDate from "../../utils/convertDate";

const BlockDateNotes = ({ notes, notesDate }) => {
  return (
    <div className={s.blockDateNotes}>
      <div className={s.blockDateNotesTitle}>
        {convertDate(notesDate, "ru")}
      </div>
      <div className={s.noteListWrapper}>
        {notes.map(({ id, ...note }) => {
          return <Note key={id} note={note} id={id} />;
        })}
      </div>
    </div>
  );
};

BlockDateNotes.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  notesDate: PropTypes.number.isRequired,
};

export default BlockDateNotes;
