import React from "react";
import PropTypes from "prop-types";

import "./Input.sass";

const Input = ({ className, inputClass, name, type, placeholder }) => {
  return (
    <div className={className}>
      <input
        className={inputClass}
        type={type}
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
};

Input.propTypes = {
  className: PropTypes.string,
  inputClass: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
};

Input.defaultProps = {
  className: "inputWrapper",
  inputClass: "input",
  name: "",
  type: "text",
  placeholder: "",
};

export default Input;
