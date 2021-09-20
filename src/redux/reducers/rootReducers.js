import { combineReducers } from "redux";
import appReducer from "./appReducer";
import authReducer from "./authReducer";
import themeReducer from "./themeReducer";
import userNameReducer from "./userNameReducer";

const rootReducers = combineReducers({
  themeColor: themeReducer,
  app: appReducer,
  auth: authReducer,
  name: userNameReducer,
});

export default rootReducers;
