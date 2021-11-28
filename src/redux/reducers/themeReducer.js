import { CHANGE_THEME } from "../actions/actionTypes";

const initialState = {
  themeStyle: "light",
  themeLight: "light",
  themeDark: "dark",
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_THEME:
      return {
        themeStyle: action.color,
      };
    default:
      return state;
  }
};

export default themeReducer;
