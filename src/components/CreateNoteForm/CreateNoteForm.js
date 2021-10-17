import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";
import Button from "../UI/Button";

import s from "./CreateNoteForm.module.sass";
import "./DateTimePicker.sass";
import { createNote, finishCreateNote } from "../../redux/actions/createNote";
// import convertDate from "../../utils/convertDate";

const CreateNoteForm = ({
  id,
  date,
  content,
  titleNote,
  createNoteConnect,
  finishCreateNoteConnect,
}) => {
  console.log("DATE", date);
  console.log("ID", id);
  const title = titleNote ? "Редактировать заметку" : "Создать новую заметку";
  const [value, onChange] = useState(
    typeof date === "number" ? new Date(date) : new Date()
  );
  const [titleVal, setTitleVal] = title ? useState(titleNote) : useState("");
  const [contentVal, setContentVal] = content
    ? useState(content)
    : useState("");

  // const options = {
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric",
  // };
  // const localDate = value.toLocaleString("ru", options).replace(" г.", "");
  // console.log("localDate", localDate);

  const clickHandler = () => {
    console.log("VALUEVALUE", value);
    const noteItem = {
      content: contentVal,
      id: id || uuidv4(),
      // date: localDate,
      date: new Date(
        `${value.getFullYear()}, ${value.getMonth() + 1},${value.getDate()}`
      ).getTime(),
      liked: false,
      ready: false,
      title: titleVal,
    };
    createNoteConnect(noteItem);
    finishCreateNoteConnect();

    // сделать проверку на успешное создание заметки
    onChange(new Date());
    setTitleVal("");
    setContentVal("");
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
        <div className={s.formFieldWrapper}>
          <Button
            className="btnWrapper"
            buttonClass="btn btn_sm"
            text={content ? "Редактировать заметку" : "Создать заметку"}
            onClick={clickHandler}
          />
          {/* {isSuccess ? (
            <div className={s.successCreate}>Заметка успешно создана</div>
          ) : null} */}
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
  content: PropTypes.string,
  titleNote: PropTypes.string,
  createNoteConnect: PropTypes.func.isRequired,
  finishCreateNoteConnect: PropTypes.func.isRequired,
};

CreateNoteForm.defaultProps = {
  id: "",
  date: "",
  content: "",
  titleNote: "",
};

export default connect(null, {
  createNoteConnect: createNote,
  finishCreateNoteConnect: finishCreateNote,
})(CreateNoteForm);
