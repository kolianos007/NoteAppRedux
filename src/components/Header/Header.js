import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
// import axios from "axios";
import Switcher from "../Switch";
import { postName, setName } from "../../redux/actions/userName";

import greetIco from "../../images/greet.svg";
import s from "./Header.module.sass";
import { initializedApp } from "../../redux/actions/app";

const Header = ({ displayName, saveName, setNameProp }) => {
  let header = (
    <header className={s.header}>
      <div className={s.header_logo}>Noteapp</div>
      <Switcher />
    </header>
  );
  const location = useLocation();
  const isInitialized = useSelector(({ app }) => {
    const { initialized } = app;
    return initialized;
  });

  useEffect(() => {
    if (location.pathname === "/logout") {
      initializedApp();
    }
  }, []);

  // eslint-disable-next-line no-shadow
  const [name, setName] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    name !== "" ? saveName(name) : false;
  };

  const onChangeHandler = (e) => {
    setName(e.target.value);
  };

  useEffect(() => {
    localStorage.getItem("nameNoteApp")
      ? setNameProp(localStorage.getItem("nameNoteApp"))
      : false;
  }, [localStorage.getItem("nameNoteApp")]);

  if (isInitialized) {
    header = (
      <header className={`${s.header} ${s.headerAuth}`}>
        <div className={s.header_logo}>Noteapp</div>
        <div className={s.header_greet}>
          {displayName.name || localStorage.getItem("nameNoteApp") ? (
            // ("nameNoteApp") !== "" ? (
            <div className={s.header_greetAuth}>
              <img src={greetIco} alt={`Привет ${displayName.name}`} />
              <span>Привет, {displayName.name}!</span>
            </div>
          ) : (
            <form className={s.formName} onSubmit={onSubmitHandler}>
              <label htmlFor="userName">
                <i className="fas fa-pencil-alt" />
                <input
                  id="userName"
                  className={s.inputGreet}
                  placeholder="Введите свое имя"
                  value={name}
                  onChange={onChangeHandler}
                />
                {name ? (
                  <button type="submit" className={s.inputGreet_btn}>
                    <i className="fas fa-save" />
                  </button>
                ) : (
                  ""
                )}
              </label>
            </form>
          )}
        </div>
        <div className={s.header_wrapper}>
          <Switcher />
          <Link to="/logout" className={s.logout}>
            Выйти
          </Link>
        </div>
      </header>
    );
  }
  return <>{header}</>;
};

Header.propTypes = {
  displayName: PropTypes.objectOf(PropTypes.string),
  saveName: PropTypes.func,
  setNameProp: PropTypes.func,
};

Header.defaultProps = {
  displayName: {},
  saveName: () => {},
  setNameProp: () => {},
};

const mapStateToProps = ({ auth, name }) => {
  return {
    isAuth: !!auth.token,
    displayName: name,
  };
};

export default connect(mapStateToProps, {
  saveName: postName,
  setNameProp: setName,
})(Header);
