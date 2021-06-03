import React from "react";
// import lightTheme from "../../images/sun.svg";
// import darkTheme from "../../images/moon.svg";
import s from "./Switch.module.sass";

const Switch = () => {
  return (
    <label htmlFor="theme" className={s.switcher}>
      <input type="checkbox" id="theme" className={s.switcher_input} />
      <span className={s.switcher_icon}>
        {/* <img src={lightTheme} alt="" /> */}
      </span>
    </label>
  );
};

export default Switch;
