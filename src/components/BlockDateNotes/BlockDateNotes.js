import React from "react";
import PropTypes from "prop-types";
import Note from "../Note/Note";

import s from "./BlockDateNotes.module.sass";

const BlockDateNotes = ({ title = "22 ноября 2020" }) => {
  return (
    <div className={s.blockDateNotes}>
      <div className={s.blockDateNotesTitle}>{title}</div>
      <div className={s.noteListWrapper}>
        <Note />
      </div>
    </div>
  );
};

BlockDateNotes.propTypes = {
  title: PropTypes.string.isRequired,
};

export default BlockDateNotes;
