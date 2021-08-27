/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, isAuth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  isAuth: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ auth }) => {
  return {
    isAuth: !!auth.token,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
