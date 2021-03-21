import React from "react";
import PropTypes from "prop-types";

import "./Button.sass";

const Button = ({ className, buttonClass, text, onClick }) => {
  return (
    <div className={className}>
      <button type="submit" className={buttonClass} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  buttonClass: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  className: "",
  buttonClass: "btn",
  text: "",
  onClick: () => {},
};

export default Button;
