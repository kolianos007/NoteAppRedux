import React from "react";
import ClampLines from "react-clamp-lines";
import s from "./Note.module.sass";

const Note = () => {
  return (
    <div className={s.note}>
      <div className={s.noteTopline}>
        <span className={s.noteDate}>22 ноябрь 2020</span>
        <button type="button" className={s.noteFavourite}>
          <span className={s.ico} />
        </button>
      </div>
      <div className={s.noteContent}>
        <div className={s.noteTitle}>
          <label htmlFor="complete" className={s.noteComplete}>
            <input type="checkbox" id="complete" name="complete" />
            <span>Buy enough</span>
          </label>
        </div>
        <ClampLines
          text="Lorem"
          lines={4}
          className={s.noteText}
          innerElement="p"
          ellipsis="..."
        />
      </div>
      <div className={s.noteBotline}>
        <button type="button" className={s.noteEdit}>
          <span className={s.ico} />
        </button>
        <button type="button" className={s.noteDelete}>
          <span className={s.ico} />
        </button>
      </div>
    </div>
  );
};

export default Note;
