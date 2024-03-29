import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";
import Button from "../UI/Button";

import s from "./CreateNoteForm.module.sass";
import "./DateTimePicker.sass";
import { createNote, finishCreateNote } from "../../redux/actions/createNote";
import { editNoteRequest } from "../../redux/actions/notes";
// import convertDate from "../../utils/convertDate";

const CreateNoteForm = ({
  id,
  date,
  oldDate,
  liked,
  ready,
  content,
  titleNote,
  closeForm,
  createNoteConnect,
  finishCreateNoteConnect,
  editNoteRequestConnect,
}) => {
  const title = titleNote ? "Редактировать заметку" : "Создать новую заметку";
  const [value, onChange] = useState(
    typeof date === "number" ? new Date(date) : new Date()
  );
  const [titleVal, setTitleVal] = title ? useState(titleNote) : useState("");
  const [contentVal, setContentVal] = content
    ? useState(content)
    : useState("");
  const [isCreated, setIsCreated] = useState(false);

  useEffect(() => {
    const timer =
      isCreated &&
      setTimeout(() => {
        setIsCreated(false);
      }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [isCreated]);

  const clickHandler = () => {
    if (titleVal && contentVal) {
      const noteItem = {
        content: contentVal,
        id: id || uuidv4(),
        // date: localDate,
        date: new Date(
          `${value.getFullYear()}, ${value.getMonth() + 1},${value.getDate()}`
        ).getTime(),
        oldDate: oldDate || "",
        liked,
        ready,
        title: titleVal,
      };
      if (id && date && content && titleNote) {
        editNoteRequestConnect(noteItem);
      } else {
        setIsCreated(true);
        createNoteConnect(noteItem);
        finishCreateNoteConnect();
        onChange(new Date());
        setTitleVal("");
        setContentVal("");
      }
      closeForm(false);
    }
  };

  return (
    <div className={s.formTemplate}>
      <div className="default-title"> {title} </div>
      <form action="" className={s.form} onSubmit={(e) => e.preventDefault()}>
        <DateTimePicker
          calendarClassName={s.formCalendarWrapp}
          className={s.formCalendar}
          onChange={onChange}
          value={value}
          locale="ru-RU"
          disableClock
          format="dd MMMM y"
          dayPlaceholder="день"
          monthPlaceholder="месяц"
          yearPlaceholder="год"
        />
        <div className={s.formFieldWrapper}>
          <input
            className={`${s.formInput}`}
            type="text"
            name="titleVal"
            placeholder="Что нужно сделать"
            // defaultValue={titleNote}
            onChange={(e) => setTitleVal(e.target.value)}
            value={titleVal}
            required
          />
        </div>
        <div className={s.formFieldWrapper}>
          <textarea
            className={s.formInput}
            type="text"
            name="contentVal"
            placeholder="Подробное описание"
            style={{
              minHeight: "150px",
            }}
            // defaultValue={content}
            onChange={(e) => setContentVal(e.target.value)}
            value={contentVal}
            required
          />
        </div>
        <div
          className={[s.formFieldWrapper, s.formFieldWrapperStatusSuccess].join(
            " "
          )}
        >
          <Button
            className="btnWrapper"
            buttonClass="btn btn_sm"
            text={content ? "Редактировать заметку" : "Создать заметку"}
            onClick={clickHandler}
          />
          {isCreated ? (
            <div className={s.successCreate}>Заметка успешно создана</div>
          ) : null}
        </div>
      </form>
    </div>
  );
};

CreateNoteForm.propTypes = {
  id: PropTypes.string,
  date: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
  oldDate: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
  liked: PropTypes.bool,
  ready: PropTypes.bool,
  content: PropTypes.string,
  titleNote: PropTypes.string,
  closeForm: PropTypes.func,
  createNoteConnect: PropTypes.func.isRequired,
  finishCreateNoteConnect: PropTypes.func.isRequired,
  editNoteRequestConnect: PropTypes.func.isRequired,
};

CreateNoteForm.defaultProps = {
  id: "",
  date: "",
  oldDate: "",
  liked: false,
  ready: false,
  content: "",
  titleNote: "",
  closeForm: () => {},
};

export default connect(null, {
  createNoteConnect: createNote,
  finishCreateNoteConnect: finishCreateNote,
  editNoteRequestConnect: editNoteRequest,
})(CreateNoteForm);
