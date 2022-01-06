import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
// import { withRouter } from "react-router";

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
import { getNote } from "./redux/actions/notes";

import s from "./App.module.sass";
import { initializedApp } from "./redux/actions/app";

function App({
  isAuth,
  isInitialized,
  autoLoginConnect,
  getNoteConnect,
  initializedAppConnect,
}) {
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
    initializedAppConnect();
  }, [isInitialized, isAuth]);

  useEffect(() => {
    dispatch(changeTheme(color));
  }, [themeColors]);
  // finished setting theme style

  useEffect(() => {
    if (isInitialized) {
      autoLoginConnect();
      getNoteConnect();
    }
  }, [isInitialized]);

  let routes;
  if (isInitialized) {
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
  } else {
    routes = (
      <Switch>
        <Route path="/registration" component={Registration} />
        <Route exact path={["/", "/login"]} component={Login} />
        {/* Изза закоментированого радериекта, даже когла Auth путь меняется на /, потому что сначала испольняется этот роутер до момента пока не станет Auth */}
        <Redirect to="/" />
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
  isInitialized: PropTypes.bool,
  autoLoginConnect: PropTypes.func,
  getNoteConnect: PropTypes.func.isRequired,
  initializedAppConnect: PropTypes.func.isRequired,
};

App.defaultProps = {
  isAuth: false,
  isInitialized: false,
  autoLoginConnect: () => {},
};

const mapStateToProps = ({ auth, app }) => {
  return {
    isAuth: !!auth.token,
    isInitialized: app.initialized,
  };
};

export default connect(mapStateToProps, {
  autoLoginConnect: autoLogin,
  getNoteConnect: getNote,
  initializedAppConnect: initializedApp,
})(App);
