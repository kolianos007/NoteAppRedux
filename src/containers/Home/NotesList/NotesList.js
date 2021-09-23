import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getNote } from "../../../redux/actions/notes";
import EmptyList from "./EmptyList/EmptyList";

const NotesList = ({ getNoteConnect }) => {
  useEffect(() => {
    getNoteConnect();
  }, []);

  return <EmptyList />;
};

NotesList.propTypes = {
  getNoteConnect: PropTypes.func.isRequired,
};

export default connect(null, { getNoteConnect: getNote })(NotesList);
