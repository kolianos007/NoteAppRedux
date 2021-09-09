import React from "react";
import PropTypes from "prop-types";

import "./Button.sass";
import Loader from "../../Loader";

const Button = ({
  className,
  buttonClass,
  text,
  onClick,
  loader,
  loading,
  loaderSize,
}) => {
  const btnContent = !loading ? (
    text
  ) : (
    <Loader width={loaderSize} height={loaderSize} />
  );
  return (
    <div className={className}>
      <button type="submit" className={buttonClass} onClick={onClick}>
        {loader ? btnContent : text}
      </button>
    </div>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  buttonClass: PropTypes.string,
  text: PropTypes.string,
  loader: PropTypes.bool,
  loading: PropTypes.bool,
  loaderSize: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  className: "",
  buttonClass: "btn",
  text: "",
  loader: false,
  loading: false,
  loaderSize: "100%",
  onClick: () => {},
};

export default Button;
