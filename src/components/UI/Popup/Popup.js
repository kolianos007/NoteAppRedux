import React from "react";
import ReactDom from "react-dom";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import s from "./Popup.module.sass";
import close from "../../../images/close.svg";

const Popup = ({ children, isOpen, themeColor, onClose }) => {
  // if (!isOpen) return null;

  return ReactDom.createPortal(
    <div
      className={
        isOpen
          ? [s.popup, themeColor, s.popupActive].join(" ")
          : [s.popup, themeColor].join(" ")
      }
    >
      <div
        className={
          isOpen
            ? [s.popupContent, s.popupContentActive].join(" ")
            : s.popupContent
        }
      >
        <button
          type="button"
          className={s.popupClose}
          onClick={() => onClose()}
        >
          <img src={close} alt="" />
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("portal")
  );
};

Popup.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any.isRequired,
};

const mapStateToProps = ({ themeColor }) => {
  return {
    themeColor: themeColor.themeStyle,
  };
};

export default connect(mapStateToProps)(Popup);
