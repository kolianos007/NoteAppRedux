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
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Nav from "./components/Nav/Nav";
import FilterBar from "./components/FilterBar/FilterBar";
import CreateNote from "./containers/Home/CreateNote/CreateNote";
import { initializedApp } from "./redux/actions/app";

function App({ isAuth, autoLoginConnect, initialized, initApp }) {
  console.log("initialized", initialized);
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
    initApp();
  }, []);

  useEffect(() => {
    autoLoginConnect();
  }, [isAuth]);

  console.log("auth", isAuth);

  let routes = (
    <Switch>
      <Route path="/registration" component={Registration} />
      <Route exact path={["/", "/login"]} component={Login} />
      {/* Изза закоментированого радериекта, даже когла Auth путь меняется на /, потому что сначала испольняется этот роутер до момента пока не станет Auth */}
      {/* <Redirect to="/" /> */}
    </Switch>
  );

  if (isAuth) {
    routes = (
      <Switch>
        <PrivateRoute exact path={["/list"]} component={() => <NotesList />} />
        <PrivateRoute path={["/fulfilled"]} component={() => <NotesList />} />
        <PrivateRoute path={["/unfulfilled"]} component={() => <NotesList />} />
        <PrivateRoute path={["/favorites"]} component={() => <NotesList />} />
        <PrivateRoute path={["/create"]} component={() => <CreateNote />} />
        <Route path="/logout" component={Logout} />
        <Redirect to="/list" />
      </Switch>
    );
  }

  // const routes = (
  //   <Switch>
  //     <Route path="/registration" component={Registration} />
  //     <Route path="/login" component={Login} />
  //     <PrivateRoute path="/list" component={() => <NotesList />} />
  //     <Route path="/logout" component={Logout} />
  //     <PrivateRoute path="/" component={() => <NotesList />} />
  //   </Switch>
  // );

  return (
    <div className={`${s.app} ${themeColors}`}>
      <Header />
      <main className="main">
        <div className="container">
          {isAuth ? (
            <>
              <Nav /> <FilterBar />
            </>
          ) : (
            ""
          )}
          {routes}
        </div>
      </main>
      <Footer />
    </div>
  );
}

App.propTypes = {
  isAuth: PropTypes.bool,
  autoLoginConnect: PropTypes.func,
  initialized: PropTypes.bool.isRequired,
  initApp: PropTypes.func.isRequired,
};

App.defaultProps = {
  isAuth: false,
  autoLoginConnect: () => {},
};

const mapStateToProps = ({ auth, app }) => {
  return {
    isAuth: !!auth.token,
    initialized: app.initialized,
  };
};

export default connect(mapStateToProps, {
  autoLoginConnect: autoLogin,
  initApp: initializedApp,
})(App);
