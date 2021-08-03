import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import s from "./App.module.sass";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Login from "./containers/Auth/Login/Login";
import Registration from "./containers/Auth/Registration/Registration";
import changeTheme from "./redux/actions/theme";
import { autoLogin } from "./redux/actions/auth";
import NotesList from "./containers/Home/NotesList";
import Logout from "./components/Logout/Logout";

function App({ isAuth, autoLoginConnect }) {
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

  useEffect(() => {
    autoLoginConnect();
  }, [isAuth]);

  console.log("auth", isAuth);

  const routes = (
    <Switch>
      <Route path="/registration" component={Registration} />
      <Route path="/login" component={Login} />
      <Route path="/list" component={NotesList} />
      <Route path="/logout" component={Logout} />
      <Route
        exact
        path="/"
        render={() => {
          console.log(1111111111, isAuth);
          isAuth ? <NotesList /> : <Login />;
        }}
      />
      <Redirect to={isAuth ? "/list" : "/login"} />
    </Switch>
  );

  return (
    <div className={`${s.app} ${themeColors}`}>
      <Header />
      {routes}
      <Footer />
    </div>
  );
}

App.propTypes = {
  isAuth: PropTypes.bool,
  autoLoginConnect: PropTypes.func,
};

App.defaultProps = {
  isAuth: false,
  autoLoginConnect: () => {},
};

const mapStateToProps = ({ auth }) => {
  console.log("isAuth", !!auth.token);
  return {
    isAuth: !!auth.token,
  };
};

export default connect(mapStateToProps, { autoLoginConnect: autoLogin })(App);
