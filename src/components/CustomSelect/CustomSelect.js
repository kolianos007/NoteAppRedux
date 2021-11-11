import React, { useState } from "react";
import PropTypes from "prop-types";

import s from "./CustomSelect.module.sass";

const CustomSelect = ({
  data,
  selected,
  setSelected,
  size,
  fullData,
  dataAttr,
  setDataAttr,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const sizeSelect = size === "Sm" ? s.customSelectSm : s.customSelectBig;

  return (
    <div className={`${s.customSelect} ${sizeSelect}`}>
      <button
        type="button"
        onClick={() => setIsActive(!isActive)}
        className={
          !isDirty
            ? s.customSelectButton
            : [s.customSelectButton, s.customSelectButtonActive].join(" ")
        }
      >
        <span data-date={dataAttr}>{selected}</span>
        <i className={!isActive ? "fas fa-caret-down" : "fas fa-caret-up"} />
      </button>
      {isActive && (
        <ul className={s.customSelectContent}>
          {data.map((el, i) => {
            return (
              <li
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                data-date={fullData[i]}
                onClick={(e) => {
                  setSelected(e.target.textContent);
                  setIsActive(!isActive);
                  setIsDirty(true);
                  setDataAttr && setDataAttr(fullData[i]);
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
  size: PropTypes.string,
  fullData: PropTypes.arrayOf(PropTypes.any),
  dataAttr: PropTypes.number,
  setDataAttr: PropTypes.func,
};

CustomSelect.defaultProps = {
  size: "",
  fullData: [],
  dataAttr: null,
  setDataAttr: null,
};

export default CustomSelect;
