import React from "react";
import { useSelector } from "react-redux";
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
  const color = useSelector(({ themeColor }) => {
    const { themeStyle } = themeColor;
    return themeStyle;
  });

  return (
    <div className={`${s.app} ${color}`}>
      <Header />
      {routes}
      <Footer />
    </div>
  );
}

export default App;
