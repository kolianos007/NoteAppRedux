import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { BrowserRouter as Router } from "react-router-dom";

import "./index.sass";
import "normalize.css";
import rootReducers from "./redux/reducers/rootReducers";
import App from "./App";

const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  // </React.StrictMode>,
  document.getElementById("root")
);
