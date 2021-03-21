import React from "react";

import s from "./Header.module.sass";

const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.header_logo}>Noteapp</div>
    </header>
  );
};

export default Header;
