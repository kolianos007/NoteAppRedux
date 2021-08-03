import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { logout } from "../../redux/actions/auth";

// import s from "./Logout.module.sass";

const Logout = ({ logoutConnect }) => {
  useEffect(() => {
    logoutConnect();
  }, []);

  return <Redirect to="/" />;
};

Logout.propTypes = {
  logoutConnect: PropTypes.func,
};

Logout.defaultProps = {
  logoutConnect: () => {},
};

export default connect(null, { logoutConnect: logout })(Logout);
