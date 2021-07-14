import React from "react";
import { useDispatch, useSelector } from "react-redux";
import changeTheme from "../../redux/actions/theme";
import s from "./Switch.module.sass";

const Switch = () => {
  const color = useSelector(({ themeColor }) => {
    const { themeStyle } = themeColor;
    return themeStyle;
  });
  const dispatch = useDispatch();
  const newColor = color === "light" ? "dark" : "light";
  console.log(newColor);

  const switchTheme = (newColorAttr) => {
    dispatch(changeTheme(newColorAttr));
  };

  return (
    <label htmlFor="theme" className={s.switcher}>
      <input
        type="checkbox"
        id="theme"
        onClick={() => switchTheme(newColor)}
        className={s.switcher_input}
      />
      <span className={s.switcher_icon} />
    </label>
  );
};

export default Switch;
