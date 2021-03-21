import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";

import s from "./App.module.sass";
import Header from "./components/Header/Header";
import Auth from "./containers/Auth/Auth";

const routes = (
  <Switch>
    <Route path="/login" component={Auth} />
  </Switch>
);

function App() {
  const [theme, setTheme] = useState("light");
  console.log(setTheme);

  return (
    <div className={`${s.app} ${theme}`}>
      <Header />
      {routes}
    </div>
  );
}

export default App;
