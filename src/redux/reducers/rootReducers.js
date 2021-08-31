import { combineReducers } from "redux";
import authReducer from "./authReducer";
import themeReducer from "./themeReducer";
import userNameReducer from "./userNameReducer";

const rootReducers = combineReducers({
  themeColor: themeReducer,
  auth: authReducer,
  name: userNameReducer,
});

export default rootReducers;
