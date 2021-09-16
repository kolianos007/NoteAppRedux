/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";

import s from "../FilterBar.module.sass";

const FilterGrid = () => {
  return (
    <div className={s.filterGrid}>
      <span className={s.filterTitle}>Вид заметок:</span>
      <div>
        <div className={s.filterRadio}>
          <input
            type="radio"
            id="radio-col"
            value="col"
            name="filter"
            defaultChecked
          />
          <label className={s.filterButton} htmlFor="radio-col">
            <i className="fas fa-th" />
          </label>
        </div>
        <div className={s.filterRadio}>
          <input type="radio" id="radio-row" value="row" name="filter" />
          <label className={s.filterButton} htmlFor="radio-row">
            <i className="fas fa-th-list" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterGrid;
