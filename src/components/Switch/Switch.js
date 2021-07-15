import React from "react";
import { useDispatch, useSelector } from "react-redux";
import changeTheme from "../../redux/actions/theme";
import s from "./Switch.module.sass";

const Switch = () => {
  const dispatch = useDispatch();
  const localStorageColor = localStorage.getItem("themeStyle");

  if (localStorageColor) {
    dispatch(changeTheme(localStorageColor));
  }

  const selectTheme = (localStorageColorAttr) => {
    if (localStorageColorAttr !== "light") {
      dispatch(changeTheme("light"));
    } else {
      dispatch(changeTheme("dark"));
    }
  };
  const color = useSelector(({ themeColor }) => {
    const { themeStyle } = themeColor;
    return themeStyle;
  });

  return (
    <label htmlFor="theme" className={s.switcher}>
      <input
        type="checkbox"
        id="theme"
        onChange={() => selectTheme(color)}
        className={s.switcher_input}
        defaultChecked={localStorageColor === "dark"}
      />
      <span className={s.switcher_icon} />
    </label>
  );
};

export default Switch;
