import React, { useState } from "react";
import PropTypes from "prop-types";

import s from "./CustomSelect.module.sass";

const CustomSelect = ({ data, selected, setSelected }) => {
  const [isActive, setIsActive] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  return (
    <div className={s.customSelect}>
      <button
        type="button"
        onClick={() => setIsActive(!isActive)}
        className={
          !isDirty
            ? s.customSelectButton
            : [s.customSelectButton, s.customSelectButtonActive].join(" ")
        }
      >
        <span>{selected}</span>
        <i className={!isActive ? "fas fa-caret-down" : "fas fa-caret-up"} />
      </button>
      {isActive && (
        <ul className={s.customSelectContent}>
          {data.map((el, i) => {
            return (
              <li
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                onClick={(e) => {
                  setSelected(e.target.textContent);
                  setIsActive(!isActive);
                  setIsDirty(true);
                }}
              >
                {el}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

CustomSelect.propTypes = {
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  setSelected: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default CustomSelect;
