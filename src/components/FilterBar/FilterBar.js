import React, { useState } from "react";
import CustomSelect from "../CustomSelect";
import Search from "../Search";

import s from "./FilterBar.module.sass";
import FilterGrid from "./FilterGrid/FilterGrid";
import FilterQuantity from "./FilterQuantity";

const FilterBar = () => {
  const date = ["14 декабря 2020", "03 января 2021", "31 августа 2020"];

  const [selected, setSelected] = useState("Выбрать дату");
  return (
    <div className={s.filterBar}>
      <div>
        <CustomSelect
          data={date}
          selected={selected}
          setSelected={setSelected}
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
