import React from "react";
import PropTypes from "prop-types";
import Note from "../Note/Note";

import s from "./BlockDateNotes.module.sass";

const BlockDateNotes = ({ notes, notesDate }) => {
  return (
    <div className={s.blockDateNotes}>
      <div className={s.blockDateNotesTitle}>{notesDate}</div>
      <div className={s.noteListWrapper}>
        {notes.map(({ id, ...note }) => {
          return <Note key={id} note={note} />;
        })}
      </div>
    </div>
  );
};

BlockDateNotes.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  notesDate: PropTypes.string.isRequired,
};

export default BlockDateNotes;
