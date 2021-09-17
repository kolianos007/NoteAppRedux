import React from "react";
import CreateNoteForm from "../../../components/CreateNoteForm/CreateNoteForm";

import s from "./CreateNote.module.sass";

const CreateNote = () => {
  return (
    <div className={s.createNote}>
      <CreateNoteForm />
    </div>
  );
};

export default CreateNote;
