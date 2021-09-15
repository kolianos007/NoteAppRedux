import React from "react";

import s from "./Search.module.sass";

const Search = () => {
  return (
    <div className={s.search}>
      <input
        type="text"
        className={s.searchInput}
        placeholder="Поиск по записям"
      />
      <button type="button" className={s.searchButton}>
        <i className="fas fa-search" />
      </button>
    </div>
  );
};

export default Search;
