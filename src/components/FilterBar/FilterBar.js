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
  const convertedDateFromStore = dateFromStore
    ? dateFromStore.map((el) => convertDate(el.date, "ru"))
    : [""];
  const arrDateFromStore = dateFromStore
    ? dateFromStore.map((el) => el.date)
    : [""];

  console.log("arrDateFromStore", arrDateFromStore);
  console.log("convertedDateFromStore", convertedDateFromStore);
  const [selected, setSelected] = useState("Выбрать дату");
  const [dataAttr, setDataAttr] = useState();

  useEffect(() => {
    dispatch(filterByDate(dataAttr));
  }, [dataAttr]);
  return (
    <div className={s.filterBar}>
      <div>
        <CustomSelect
          data={convertedDateFromStore}
          selected={selected}
          fullData={arrDateFromStore}
          setSelected={setSelected}
          dataAttr={dataAttr}
          setDataAttr={setDataAttr}
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
