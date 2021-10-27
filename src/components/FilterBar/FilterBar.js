import React, { useState } from "react";
import { useSelector } from "react-redux";
import convertDate from "../../utils/convertDate";
import CustomSelect from "../CustomSelect";
import Search from "../Search";

import s from "./FilterBar.module.sass";
import FilterGrid from "./FilterGrid/FilterGrid";
import FilterQuantity from "./FilterQuantity";

const FilterBar = () => {
  const dateFromStore = useSelector(({ notes }) => notes.notesList);
  const arrDateFromStore = dateFromStore
    ? dateFromStore.map((el) => convertDate(el.date, "ru"))
    : [""];

  const [selected, setSelected] = useState("Выбрать дату");
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
