import CHANGE_THEME from "./actionCreators";

const changeTheme = (color) => {
  localStorage.setItem("themeStyle", color);
  return {
    type: CHANGE_THEME,
    color,
  };
};

export default changeTheme;
