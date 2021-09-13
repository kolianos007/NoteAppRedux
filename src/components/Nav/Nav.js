import React from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
// import PropTypes from "prop-types";

import s from "./Nav.module.sass";

const Nav = () => {
  return (
    <nav className={s.nav}>
      <NavLink
        className={s.navLink}
        activeClassName={s.navLinkActive}
        to="/list"
      >
        Все записи
      </NavLink>
      <NavLink
        className={s.navLink}
        activeClassName={s.navLinkActive}
        to="/fulfilled"
      >
        Выполненные
      </NavLink>
      <NavLink
        className={s.navLink}
        activeClassName={s.navLinkActive}
        to="/unfulfilled"
      >
        Невыполненные
      </NavLink>
      <NavLink
        className={s.navLink}
        activeClassName={s.navLinkActive}
        to="/favorites"
      >
        Избранное
      </NavLink>
      <NavLink
        className={s.navLink}
        activeClassName={s.navLinkActive}
        to="/create"
      >
        Создать
      </NavLink>
    </nav>
  );
};

// Nav.propTypes = {
//   location: PropTypes.objectOf(PropTypes.any),
//   history: PropTypes.objectOf(PropTypes.any),
// };

// Nav.defaultProps = {
//   location: {},
//   history: {},
// };

export default withRouter(Nav);
