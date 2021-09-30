/* eslint-disable no-nested-ternary */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getNote } from "../../../redux/actions/notes";
import EmptyList from "./EmptyList/EmptyList";
import Loader from "../../../components/Loader";

import s from "./NotesList.module.sass";
import BlockDateNotes from "../../../components/BlockDateNotes/BlockDateNotes";

const NotesList = ({ getNoteConnect, notes, loader }) => {
  useEffect(() => {
    getNoteConnect();
  }, []);

  return (
    <div className={s.listWrapper}>
      {loader ? (
        <Loader width="5rem" height="5rem" />
      ) : notes.length > 0 ? (
        notes.map(({ date, id, notesList }) => {
          return <BlockDateNotes key={id} notesDate={date} notes={notesList} />;
        })
      ) : (
        <EmptyList />
      )}
    </div>
  );
};

NotesList.propTypes = {
  getNoteConnect: PropTypes.func.isRequired,
  notes: PropTypes.arrayOf(PropTypes.object),
  loader: PropTypes.bool.isRequired,
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
