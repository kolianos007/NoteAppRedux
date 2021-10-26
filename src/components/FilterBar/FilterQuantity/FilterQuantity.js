import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { visibleBlockNotes } from "../../../redux/actions/notes";
import CustomSelect from "../../CustomSelect";

import s from "../FilterBar.module.sass";

const FilterQuantity = () => {
  const quantityVisibleBlockNotes = localStorage.getItem("visibleBlockNotes");
  const numberBlock = quantityVisibleBlockNotes || 2;
  const quantityPerPage = [2, 4, 8, 16];
  const [selected, setSelected] = useState(numberBlock);
  const dispatch = useDispatch();
  const storeVisBlock = useSelector((state) => state.notes.visibleBlock);

  useEffect(() => {
    localStorage.setItem("visibleBlockNotes", selected);
    dispatch(visibleBlockNotes(storeVisBlock));
    console.log("selectedselectedselected", selected);
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
