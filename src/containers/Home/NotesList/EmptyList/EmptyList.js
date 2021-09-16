import React from "react";
import { Link } from "react-router-dom";
import s from "../NotesList.module.sass";

const EmptyList = () => {
  return (
    <div className={s.emptyList}>
      <div className={s.emptyListTitle}>У вас пока нет записей</div>
      <Link className={s.emptyListLink} to="/create">
        <span>Создать запись</span>
        <i className="fas fa-plus-square" />
      </Link>
    </div>
  );
};

export default EmptyList;
