import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router";
import { setSearchNotesList } from "../../redux/actions/notes";

import s from "./Search.module.sass";

const Search = () => {
  const [searchVal, setSearchVal] = useState(null);
  const [filteredVal, setFilteredVal] = useState(null);
  const [isDirtySearch, setIsDirtySearch] = useState(false);
  const dispatch = useDispatch();
  const notesList = useSelector((state) => state.notes.notesList);

  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  const match = useRouteMatch();
  console.log("history", history);
  console.log("location", location);
  console.log("params", params);
  console.log("match", match);

  const filterArr = (arr, filterVal) => {
    const copyArr = JSON.parse(JSON.stringify(arr));
    return (
      copyArr &&
      copyArr
        .map((notesBlock) => {
          const filteredNote = notesBlock.notesList.filter((note) => {
            console.log(note);
            switch (location.pathname) {
              case "/list":
                return (
                  note.title.includes(filterVal) ||
                  note.content.includes(filterVal)
                );
              case "/fulfilled":
                return (
                  note.ready &&
                  (note.title.includes(filterVal) ||
                    note.content.includes(filterVal))
                );
              case "/unfulfilled":
                return (
                  !note.ready &&
                  (note.title.includes(filterVal) ||
                    note.content.includes(filterVal))
                );
              case "/favorites":
                return (
                  note.liked &&
                  (note.title.includes(filterVal) ||
                    note.content.includes(filterVal))
                );
              default:
                return null;
            }
          });
          return { ...notesBlock, notesList: filteredNote };
        })
        .filter((e) => e.notesList.length > 0)
    );
  };

  useEffect(() => {
    console.log("searchVAL", searchVal, filterArr(notesList, searchVal));
    isDirtySearch &&
      // searchVal &&
      setFilteredVal(filterArr(notesList, searchVal));
    // filteredVal && filteredVal.length < 1
    //   ? setFilteredVal(filterArr([]))
    //   : null;
    // searchVal && filteredVal.length < 1 ? setFilteredVal(filterArr([]))
  }, [searchVal, notesList]);

  useEffect(() => {
    // isDirtySearch &&
    //   filteredVal &&
    //   filteredVal.length < 1 &&
    //   dispatch(setSearchNotesList([]));
    console.log("filteredVal", filteredVal);
    dispatch(setSearchNotesList(filteredVal));
  }, [filteredVal]);

  const onChangeHandler = (e) => {
    setSearchVal(e.target.value);
    setIsDirtySearch(true);
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
