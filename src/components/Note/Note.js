import React, { useState } from "react";
import ClampLines from "react-clamp-lines";
import PropTypes from "prop-types";
import s from "./Note.module.sass";
import Popup from "../UI/Popup/Popup";
import CreateNoteForm from "../CreateNoteForm/CreateNoteForm";

const Note = ({ note: { id, date, title, content, liked, ready } }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={s.note}>
      <div className={s.noteTopline}>
        <span className={s.noteDate}>{date}</span>
        <button
          type="button"
          className={
            liked
              ? [s.noteFavourite, s.noteFavouriteLike].join(" ")
              : s.noteFavourite
          }
        >
          <span className={s.ico} />
        </button>
      </div>
      <div className={s.noteContent}>
        <div className={s.noteTitle}>
          <label htmlFor={id} className={s.noteComplete}>
            <input
              type="checkbox"
              id={id}
              name="complete"
              defaultChecked={!!ready}
            />
            <span>{title}</span>
          </label>
        </div>
        <ClampLines
          text={content}
          lines={4}
          className={s.noteText}
          innerElement="div"
          ellipsis="..."
          buttons={false}
        />
      </div>
      <div className={s.noteBotline}>
        <button
          type="button"
          className={s.noteEdit}
          onClick={() => setIsOpen(true)}
        >
          <span className={s.ico} />
        </button>
        <button type="button" className={s.noteDelete}>
          <span className={s.ico} />
        </button>
      </div>
      <Popup
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <CreateNoteForm />
      </Popup>
    </div>
  );
};

Note.propTypes = {
  note: PropTypes.objectOf(PropTypes.any).isRequired,
  // date: PropTypes.string.isRequired,
  // title: PropTypes.string.isRequired,
  // content: PropTypes.string.isRequired,
  // liked: PropTypes.bool.isRequired,
  // ready: PropTypes.bool.isRequired,
};

export default Note;
