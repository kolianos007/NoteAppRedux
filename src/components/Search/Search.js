import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchNotesList } from "../../redux/actions/notes";

import s from "./Search.module.sass";

const Search = () => {
  const [searchVal, setSearchVal] = useState();
  const [filteredVal, setFilteredVal] = useState();
  const dispatch = useDispatch();
  const notesList = useSelector((state) => state.notes.notesList);

  const filterArr = (arr, filterVal) => {
    const copyArr = JSON.parse(JSON.stringify(arr));
    return (
      copyArr &&
      copyArr
        .map((notesBlock) => {
          const filteredNote = notesBlock.notesList.filter((note) => {
            console.log(note);
            return (
              note.title.includes(filterVal) || note.content.includes(filterVal)
            );
          });
          return { ...notesBlock, notesList: filteredNote };
        })
        .filter((e) => e.notesList.length > 0)
    );
  };

  useEffect(() => {
    setFilteredVal(filterArr(notesList, searchVal));
  }, [searchVal, notesList]);

  useEffect(() => {
    if (filteredVal) {
      dispatch(setSearchNotesList(filteredVal));
    }
  }, [filteredVal]);

  const onChangeHandler = (e) => {
    setSearchVal(e.target.value);
  };

  return (
    <div className={s.search}>
      <input
        type="text"
        className={s.searchInput}
        placeholder="Поиск по записям"
        onChange={onChangeHandler}
      />
      <button type="button" className={s.searchButton}>
        <i className="fas fa-search" />
      </button>
    </div>
  );
};

export default Search;
