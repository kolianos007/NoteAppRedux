import React, { useState } from "react";
import CustomSelect from "../../CustomSelect";

import s from "../FilterBar.module.sass";

const FilterQuantity = () => {
  const quantityPerPage = [2, 4, 8, 16];
  const [selected, setSelected] = useState(2);
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
