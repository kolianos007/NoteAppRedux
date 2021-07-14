import { combineReducers } from "redux";
import themeReducer from "./themeReducer";

const rootReducers = combineReducers({
  themeColor: themeReducer,
});

export default rootReducers;
