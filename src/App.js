import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";

import s from "./App.module.sass";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Login from "./containers/Auth/Login/Login";
import Registration from "./containers/Auth/Registration/Registration";

const routes = (
  <Switch>
    <Route path="/registration" component={Registration} />
    <Route path="/login" component={Login} />
  </Switch>
);

function App() {
  const [theme, setTheme] = useState("light");
  console.log(setTheme);

  return (
    <div className={`${s.app} ${theme}`}>
      <Header />
      {routes}
      <Footer />
    </div>
  );
}

export default App;
