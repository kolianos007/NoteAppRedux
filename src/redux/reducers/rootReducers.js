import { combineReducers } from "redux";
import authReducer from "./authReducer";
import themeReducer from "./themeReducer";

const rootReducers = combineReducers({
  themeColor: themeReducer,
  auth: authReducer,
});

export default rootReducers;
