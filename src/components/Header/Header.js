import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Switch from "../Switch";
import { postName } from "../../redux/actions/userName";

import s from "./Header.module.sass";

let header = (
  <header className={s.header}>
    <div className={s.header_logo}>Noteapp</div>
    <Switch />
  </header>
);

const Header = ({ isAuth, saveName }) => {
  const [name, setName] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    name !== "" ? saveName(name) : false;
  };

  const onChangeHandler = (e) => {
    setName(e.target.value);
  };

  if (isAuth) {
    header = (
      <header className={`${s.header} ${s.headerAuth}`}>
        <div className={s.header_logo}>Noteapp</div>
        <div className={s.header_greet}>
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
  saveName: PropTypes.func,
};

Header.defaultProps = {
  isAuth: false,
  saveName: () => {},
};

const mapStateToProps = ({ auth }) => {
  return {
    isAuth: !!auth.token,
  };
};

export default connect(mapStateToProps, { saveName: postName })(Header);
