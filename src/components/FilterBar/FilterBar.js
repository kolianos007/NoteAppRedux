import React from "react";
import CustomSelect from "../CustomSelect";
import Search from "../Search";

import s from "./FilterBar.module.sass";

const FilterBar = () => {
  return (
    <div className={s.filterBar}>
      <CustomSelect />
      <Search />
    </div>
  );
};

export default FilterBar;
