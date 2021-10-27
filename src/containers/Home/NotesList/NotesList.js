/* eslint-disable no-nested-ternary */
import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import EmptyList from "./EmptyList/EmptyList";
import Loader from "../../../components/Loader";

import s from "./NotesList.module.sass";
import BlockDateNotes from "../../../components/BlockDateNotes/BlockDateNotes";
import { getNote, visibleBlockNotes } from "../../../redux/actions/notes";
import Button from "../../../components/UI/Button";

const NotesList = ({ notes, loader, getNoteConnect }) => {
  const visibleBlock = useSelector((state) => state.notes.visibleBlock);
  // const filterDate = useSelector(({ notes }) => notes.filterDate);

  const dispatch = useDispatch();
  useEffect(() => {
    getNoteConnect();
  }, []);

  const getMoreNotes = () => {
    dispatch(
      visibleBlockNotes(
        visibleBlock + localStorage.getItem("visibleBlockNotes")
      )
    );
  };

  return (
    <div className={s.listWrapper}>
      {loader ? (
        <Loader width="5rem" height="5rem" />
      ) : notes ? (
        <>
          {notes.map(({ date, id, notesList }, i) => {
            return visibleBlock > i ? (
              <BlockDateNotes key={id} notesDate={date} notes={notesList} />
            ) : (
              false
            );
          })}
          {visibleBlock >= notes.length ? null : (
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
