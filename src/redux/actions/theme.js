import CHANGE_THEME from "./actionCreators";

const changeTheme = (color) => {
  return {
    type: CHANGE_THEME,
    color,
  };
};

export default changeTheme;
