import CHANGE_THEME from "../actions/actionCreators";

const initialState = {
  themeStyle: "light",
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
