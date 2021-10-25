import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
import CustomSelect from "../../CustomSelect";

import s from "../FilterBar.module.sass";

const FilterQuantity = () => {
  const visibleBlockNotes = localStorage.getItem("visibleBlockNotes");
  const numberBlock = visibleBlockNotes || 2;
  const quantityPerPage = [2, 4, 8, 16];
  const [selected, setSelected] = useState(numberBlock);
  // const dispatch = useDispatch()

  useEffect(() => {
    localStorage.setItem("visibleBlockNotes", selected);
  }, [selected]);

  return (
    <div className={s.filterQuantity}>
      <span className={s.filterTitle}>К-во блоков на странице:</span>
      <CustomSelect
        data={quantityPerPage}
        selected={selected}
        setSelected={setSelected}
        size="Sm"
      />
    </div>
  );
};

export default FilterQuantity;
