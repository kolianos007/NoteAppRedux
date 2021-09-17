import React, { useState } from "react";
import PropTypes from "prop-types";
import DateTimePicker from "react-datetime-picker";
import Button from "../UI/Button";

import s from "./CreateNoteForm.module.sass";

const CreateNoteForm = ({ data }) => {
  const title = data ? "Редактировать заметку" : "Создать новую заметку";
  const [value, onChange] = useState(new Date());
  const options = { year: "numeric", month: "long", day: "numeric" };
  const localDate = value.toLocaleString("ru-RU", options);
  console.log("localDate", localDate);

  return (
    <div className={s.formTemplate}>
      <div className="default-title">{title}</div>
      <form action="" className={s.form}>
        <DateTimePicker
          calendarClassName={s.formCalendar}
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
          <input type="text" name="title" placeholder="Что нужно сделать" />
        </div>
        <div className={s.formFieldWrapper}>
          <input type="text" name="title" placeholder="Подробное описание" />
        </div>
        <Button
          className="btnWrapper"
          buttonClass="btn btn_sm"
          text={data ? "Редактировать заметку" : "Создать заметку"}
        />
      </form>
    </div>
  );
};

CreateNoteForm.propTypes = {
  data: PropTypes.objectOf(PropTypes.any),
};

CreateNoteForm.defaultProps = {
  data: null,
};

export default CreateNoteForm;
