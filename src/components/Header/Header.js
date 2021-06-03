import React from "react";
import Switch from "../Switch/Switch";

import s from "./Header.module.sass";

const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.header_logo}>Noteapp</div>
      <Switch />
    </header>
  );
};

export default Header;
