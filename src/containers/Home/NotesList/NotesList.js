/* eslint-disable no-nested-ternary */
import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useLocation } from "react-router";
import EmptyList from "./EmptyList/EmptyList";
import Loader from "../../../components/Loader";

import s from "./NotesList.module.sass";
import BlockDateNotes from "../../../components/BlockDateNotes/BlockDateNotes";
import { getNote, visibleBlockNotes } from "../../../redux/actions/notes";
import Button from "../../../components/UI/Button";

const NotesList = ({ notes, loader, getNoteConnect }) => {
  const visibleBlock = useSelector((state) => state.notes.visibleBlock);
  const filteredDate = useSelector((state) => state.notes.filterDate);
  const searchedNoteList = useSelector((state) => state.notes.searchedNote);
  const location = useLocation();
  let locationNoteList;

  const getLocationNoteList = () => {
    locationNoteList = JSON.parse(JSON.stringify(notes));
    return (
      locationNoteList &&
      locationNoteList
        .map((notesBlock) => {
          const locationNote = notesBlock.notesList.filter((note) => {
            switch (location.pathname) {
              case "/fulfilled":
                return note.ready;
              case "/unfulfilled":
                return !note.ready;
              case "/favorites":
                return note.liked;
              default:
                return true;
            }
          });
          return { ...notesBlock, notesList: locationNote };
        })
        .filter((e) => e.notesList.length > 0)
    );
  };

  const dispatch = useDispatch();
  useEffect(() => {
    getNoteConnect();
  }, []);

  const getMoreNotes = () => {
    dispatch(
      visibleBlockNotes(
        +visibleBlock + +localStorage.getItem("visibleBlockNotes")
      )
    );
  };

  const templateNotesBlock = (dataArr) => {
    console.log(dataArr);
    return dataArr.map(({ date, id, notesList }, i) => {
      return filteredDate ? (
        date === filteredDate ? (
          <BlockDateNotes key={id} notesDate={date} notes={notesList} />
        ) : null
      ) : visibleBlock > i ? (
        <BlockDateNotes key={id} notesDate={date} notes={notesList} />
      ) : null;
    });
  };

  return (
    <div className={s.listWrapper}>
      {loader ? (
        <Loader width="5rem" height="5rem" />
      ) : notes ? (
        <>
          {searchedNoteList && searchedNoteList.length > 0 ? (
            templateNotesBlock(searchedNoteList)
          ) : searchedNoteList && searchedNoteList.length === 0 ? (
            <div className={s.emptyListMess}>Нет записей с таким запросом</div>
          ) : (
            templateNotesBlock(getLocationNoteList())
          )}
          {visibleBlock >= getLocationNoteList().length ||
          (searchedNoteList && searchedNoteList.length < 3)
            ? null
            : !filteredDate && (
                <Button
                  className="btnWrapper btnWrapper_center"
                  buttonClass="btn btn_sm"
                  text="Показать еще"
                  loader
                  loading={loader}
                  loaderSize="3.125rem"
                  onClick={() => getMoreNotes()}
                />
              )}
        </>
      ) : (
        <EmptyList />
      )}
    </div>
  );
};

NotesList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object),
  loader: PropTypes.bool.isRequired,
  getNoteConnect: PropTypes.func.isRequired,
};

NotesList.defaultProps = {
  notes: [],
};

const mapStateToProps = ({ notes }) => {
  return {
    notes: notes.notesList,
    loader: notes.loading,
  };
};

export default connect(mapStateToProps, { getNoteConnect: getNote })(NotesList);
