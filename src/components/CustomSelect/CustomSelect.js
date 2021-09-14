import React from "react";

import s from "./CustomSelect.module.sass";

const CustomSelect = () => {
  return (
    <div className={s.customSelect}>
      <div className={s.customSelectButton}>
        <span>Выберите дату</span>
        <i className="fas fa-caret-down" />
      </div>
      <ul className={s.customSelectContent}>
        <li>14 декабря 2020</li>
        <li>03 января 2021</li>
        <li>31 августа 2020</li>
      </ul>
    </div>
  );
};

export default CustomSelect;
