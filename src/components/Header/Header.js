import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// import axios from "axios";
import Switch from "../Switch";
import { postName, setName } from "../../redux/actions/userName";

import greetIco from "../../images/greet.svg";
import s from "./Header.module.sass";

const Header = ({ isAuth, displayName, saveName, setNameProp }) => {
  let header = (
    <header className={s.header}>
      <div className={s.header_logo}>Noteapp</div>
      <Switch />
    </header>
  );
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
    console.log("localStor", localStorage.getItem("nameNoteApp"));
    localStorage.getItem("nameNoteApp")
      ? setNameProp(localStorage.getItem("nameNoteApp"))
      : false;
  }, [localStorage.getItem("nameNoteApp")]);

  console.log("displayName", displayName);
  if (isAuth) {
    header = (
      <header className={`${s.header} ${s.headerAuth}`}>
        <div className={s.header_logo}>Noteapp</div>
        <div className={s.header_greet}>
          {displayName.name || localStorage.getItem("nameNoteApp") !== "" ? (
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
          <Switch />
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
  isAuth: PropTypes.bool,
  displayName: PropTypes.objectOf(PropTypes.string),
  saveName: PropTypes.func,
  setNameProp: PropTypes.func,
};

Header.defaultProps = {
  isAuth: false,
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
