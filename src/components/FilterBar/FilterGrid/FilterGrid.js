/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { setNoteStyleAction } from "../../../redux/actions/notes";

import s from "../FilterBar.module.sass";

const FilterGrid = () => {
  const [noteStyle, setNoteStyle] = useLocalStorage("noteStyle", "col");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setNoteStyleAction(noteStyle));
  }, [noteStyle]);

  const onChangeHandler = (e) => {
    setNoteStyle(e.target.value);
  };

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
            defaultChecked={noteStyle === "col"}
            onChange={onChangeHandler}
          />
          <label className={s.filterButton} htmlFor="radio-col">
            <i className="fas fa-th" />
          </label>
        </div>
        <div className={s.filterRadio}>
          <input
            type="radio"
            id="radio-row"
            value="row"
            onChange={onChangeHandler}
            name="filter"
            defaultChecked={noteStyle === "row"}
          />
          <label className={s.filterButton} htmlFor="radio-row">
            <i className="fas fa-th-list" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterGrid;
