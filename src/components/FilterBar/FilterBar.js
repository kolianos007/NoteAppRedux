import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByDate } from "../../redux/actions/notes";
import convertDate from "../../utils/convertDate";
import CustomSelect from "../CustomSelect";
import Search from "../Search";

import s from "./FilterBar.module.sass";
import FilterGrid from "./FilterGrid/FilterGrid";
import FilterQuantity from "./FilterQuantity";

const FilterBar = () => {
  const dispatch = useDispatch();
  const dateFromStore = useSelector(({ notes }) => notes.notesList);
  const arrDateFromStore = dateFromStore
    ? dateFromStore.map((el) => convertDate(el.date, "ru"))
    : [""];

  const [selected, setSelected] = useState("Выбрать дату");

  useEffect(() => {
    dispatch(filterByDate(selected));
  }, [selected]);
  return (
    <div className={s.filterBar}>
      <div>
        <CustomSelect
          data={arrDateFromStore}
          selected={selected}
          setSelected={setSelected}
          size="Big"
        />
        <Search />
      </div>
      <div>
        <FilterQuantity />
        <FilterGrid />
      </div>
    </div>
  );
};

export default FilterBar;
