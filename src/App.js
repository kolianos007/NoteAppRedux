import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";

import s from "./App.module.sass";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Login from "./containers/Auth/Login/Login";
import Registration from "./containers/Auth/Registration/Registration";
import changeTheme from "./redux/actions/theme";
// import changeTheme from "./redux/actions/theme";

const routes = (
  <Switch>
    <Route path="/registration" component={Registration} />
    <Route path="/login" component={Login} />
  </Switch>
);

function App() {
  // setting theme style
  const localStorageColor = localStorage.getItem("themeStyle");
  const color =
    localStorageColor ||
    (localStorage.setItem("themeStyle", "light") &&
      localStorage.getItem("themeStyle"));
  const dispatch = useDispatch();
  const themeColors = useSelector(({ themeColor }) => {
    const { themeStyle } = themeColor;
    return themeStyle;
  });

  useEffect(() => {
    dispatch(changeTheme(color));
  }, []);
  // finished setting theme style

  return (
    <div className={`${s.app} ${themeColors}`}>
      <Header />
      {routes}
      <Footer />
    </div>
  );
}

export default App;
