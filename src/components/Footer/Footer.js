import React from "react";
import { Link } from "react-router-dom";
import s from "./Footer.module.sass";

const Footer = () => {
  return (
    <footer className={s.footer}>
      <div className="container">
        <div className={s.footer_copyright}>© 2021 All rights reserved</div>
        <div className={s.footer_author}>
          Made by <Link to="№">Kol_ko</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
