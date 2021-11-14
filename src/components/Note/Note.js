import React, { useState } from "react";
import ClampLines from "react-clamp-lines";
import PropTypes from "prop-types";
import { connect, useSelector } from "react-redux";
import s from "./Note.module.sass";
import Popup from "../UI/Popup/Popup";
import CreateNoteForm from "../CreateNoteForm/CreateNoteForm";
import convertDate from "../../utils/convertDate";
import {
  deleteNoteRequest,
  likeNoteRequest,
  readyNoteRequest,
} from "../../redux/actions/notes";

const Note = ({
  note: { date, title, content, liked, ready },
  id,
  deleteNoteRequestConnect,
  likeNoteRequestConnect,
  onReadyRequestConnect,
  // noteStore,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onDeleteHandler = () => {
    deleteNoteRequestConnect(id, date);
  };
  const onLikeHandler = () => {
    likeNoteRequestConnect(id, date);
  };
  const onReadyHandler = () => {
    onReadyRequestConnect(id, date);
  };
  // console.log("noteStore", noteStore);

  const clsNote = [s.note];
  const noteStyle = useSelector((state) => state.notes.noteStyle);

  if (noteStyle) {
    clsNote.push([s[noteStyle]]);
  }

  return (
    <div className={clsNote.join(" ")}>
      <div className={s.noteTopline}>
        <span className={s.noteDate}>{convertDate(date, "ru")}</span>
        <button
          type="button"
          className={
            liked
              ? [s.noteFavourite, s.noteFavouriteLike].join(" ")
              : s.noteFavourite
          }
          onClick={() => onLikeHandler()}
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
              onClick={() => onReadyHandler()}
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
        <button
          type="button"
          className={s.noteDelete}
          onClick={() => onDeleteHandler()}
        >
          <span className={s.ico} />
        </button>
      </div>
      <Popup
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <CreateNoteForm
          id={id}
          date={date}
          liked={liked}
          ready={ready}
          titleNote={title}
          content={content}
          closeForm={setIsOpen}
        />
      </Popup>
    </div>
  );
};

Note.propTypes = {
  note: PropTypes.objectOf(PropTypes.any).isRequired,
  id: PropTypes.string.isRequired,
  // noteStore: PropTypes.objectOf.isRequired,
  deleteNoteRequestConnect: PropTypes.func.isRequired,
  likeNoteRequestConnect: PropTypes.func.isRequired,
  onReadyRequestConnect: PropTypes.func.isRequired,
};

const mapStateToProps = () => {
  return {
    // noteStore: notes.note,
  };
};

export default connect(mapStateToProps, {
  deleteNoteRequestConnect: deleteNoteRequest,
  likeNoteRequestConnect: likeNoteRequest,
  onReadyRequestConnect: readyNoteRequest,
})(Note);
