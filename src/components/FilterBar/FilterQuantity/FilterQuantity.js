import React, { useState } from "react";
import CustomSelect from "../../CustomSelect";

import s from "../FilterBar.module.sass";

const FilterQuantity = () => {
  const quantityPerPage = [8, 16, 32, 64];
  const [selected, setSelected] = useState(8);
  return (
    <div className={s.filterQuantity}>
      <span className={s.filterTitle}>К-во на странице:</span>
      <CustomSelect
        data={quantityPerPage}
        selected={selected}
        setSelected={setSelected}
      />
    </div>
  );
};

export default FilterQuantity;
