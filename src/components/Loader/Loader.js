import React from "react";
import PropTypes from "prop-types";
import loader from "../../images/loader.svg";
import "./Loader.sass";

const Loader = ({ width, height }) => {
  return (
    <div className="loader" style={{ width, height }}>
      <img src={loader} alt="Loading" />
    </div>
  );
};

Loader.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

Loader.defaultProps = {
  width: "",
  height: "",
};

export default Loader;
