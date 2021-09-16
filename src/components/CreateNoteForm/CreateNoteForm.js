import React from "react";
import PropTypes from "prop-types";

import s from "./CreateNoteForm.module.sass";

const CreateNoteForm = ({ data }) => {
  const title = data ? "Редактировать заметку" : "Создать новую заметку";
  return (
    <div className={s.formTemplate}>
      <div className="default-title">{title}</div>
      <form action="" className={s.form}>
        <div className={s.formFieldWrapper}>
          <input type="text" name="title" placeholder="Что нужно сделать" />
        </div>
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
