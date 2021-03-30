/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import PropTypes from "prop-types";

import "./Input.sass";

const Input = ({
  className,
  inputClass,
  name,
  type,
  placeholder,
  onChange,
  value,
  onBlur,
  icon,
  onClickIcon,
  errorMess,
}) => {
  return (
    <div className={className}>
      <input
        className={inputClass}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {icon && <i className={icon} onClick={onClickIcon} />}
      {errorMess && <span className="error-mess">{errorMess}</span>}
    </div>
  );
};

Input.propTypes = {
  className: PropTypes.string,
  inputClass: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  onBlur: PropTypes.func,
  icon: PropTypes.string,
  onClickIcon: PropTypes.func,
  errorMess: PropTypes.string,
};

Input.defaultProps = {
  className: "inputWrapper",
  inputClass: "input",
  name: "",
  type: "text",
  placeholder: "",
  onChange: () => {},
  value: "",
  onBlur: () => {},
  icon: "",
  onClickIcon: () => {},
  errorMess: "",
};

export default Input;
