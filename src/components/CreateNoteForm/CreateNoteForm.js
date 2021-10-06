import React, { useState } from "react";
import PropTypes from "prop-types";
// import DateTimePicker from "react-datetime-picker";
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";
import Button from "../UI/Button";

import s from "./CreateNoteForm.module.sass";
import "./DateTimePicker.sass";

const CreateNoteForm = ({ date, content, titleNote }) => {
  console.log(date);
  const title = titleNote ? "Редактировать заметку" : "Создать новую заметку";
  const [value, onChange] = useState(new Date());
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const localDate = value.toLocaleString("ru-RU", options);
  console.log("localDate", localDate);

  return (
    <div className={s.formTemplate}>
      <div className="default-title"> {title} </div>{" "}
      <form action="" className={s.form}>
        <DateTimePicker
          calendarClassName={s.formCalendarWrapp}
          className={s.formCalendar}
          onChange={onChange}
          value={new Date(24 * 3600 * 1000)}
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
            name="title"
            placeholder="Что нужно сделать"
            defaultValue={title}
          />
        </div>{" "}
        <div className={s.formFieldWrapper}>
          <textarea
            className={s.formInput}
            type="text"
            name="title"
            placeholder="Подробное описание"
            style={{
              minHeight: "150px",
            }}
            defaultValue={content}
          />{" "}
        </div>{" "}
        <Button
          className="btnWrapper"
          buttonClass="btn btn_sm"
          text={content ? "Редактировать заметку" : "Создать заметку"}
        />{" "}
      </form>{" "}
    </div>
  );
};

CreateNoteForm.propTypes = {
  date: PropTypes.string,
  content: PropTypes.string,
  titleNote: PropTypes.string,
};

CreateNoteForm.defaultProps = {
  date: new Date(),
  content: null,
  titleNote: null,
};

export default CreateNoteForm;
