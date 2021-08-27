import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Switch from "../Switch";

import s from "./Header.module.sass";

let header = (
  <header className={s.header}>
    <div className={s.header_logo}>Noteapp</div>
    <Switch />
  </header>
);

const Header = ({ isAuth }) => {
  if (isAuth) {
    header = (
      <header className={`${s.header} ${s.headerAuth}`}>
        <div className={s.header_logo}>Noteapp</div>
        <div className={s.header_greet}>
          <label htmlFor="userName">
            <i className="fas fa-pencil-alt" />
            <input
              id="userName"
              className={s.inputGreet}
              placeholder="Введите свое имя"
            />
          </label>
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
};

Header.defaultProps = {
  isAuth: false,
};

const mapStateToProps = ({ auth }) => {
  return {
    isAuth: !!auth.token,
  };
};

export default connect(mapStateToProps)(Header);
