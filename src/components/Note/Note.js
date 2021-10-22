import React, { useState } from "react";
import ClampLines from "react-clamp-lines";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import s from "./Note.module.sass";
import Popup from "../UI/Popup/Popup";
import CreateNoteForm from "../CreateNoteForm/CreateNoteForm";
import convertDate from "../../utils/convertDate";
import { deleteNoteRequest } from "../../redux/actions/notes";

const Note = ({
  note: { date, title, content, liked, ready },
  id,
  // deleteNoteRequestConnect,
  noteStore,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onDeleteHandler = () => {
    console.log("id", id);
    console.log("date", date);
    // deleteNoteRequestConnect();
  };
  console.log("ID", id);
  console.log("noteStore", noteStore);
  return (
    <div className={s.note}>
      <div className={s.noteTopline}>
        <span className={s.noteDate}>{convertDate(date)}</span>
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
  noteStore: PropTypes.objectOf.isRequired,
  // deleteNoteRequestConnect: PropTypes.func.isRequired,
};

const mapStateToProps = ({ notes }) => {
  return {
    noteStore: notes.note,
  };
};

export default connect(mapStateToProps, {
  deleteNoteRequestConnect: deleteNoteRequest,
})(Note);
