import { combineReducers } from "redux";
import appReducer from "./appReducer";
import authReducer from "./authReducer";
import notesReducer from "./notesReducer";
import themeReducer from "./themeReducer";
import userNameReducer from "./userNameReducer";

const rootReducers = combineReducers({
  themeColor: themeReducer,
  app: appReducer,
  auth: authReducer,
  name: userNameReducer,
  notesList: notesReducer,
});

export default rootReducers;
