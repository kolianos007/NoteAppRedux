import React from "react";
import s from "./Auth.module.sass";
import Registration from "./Registration/Registration";

const Auth = () => {
  return (
    <div className={s.auth}>
      <div className="container">
        <h1>Добро пожаловать в NoteApp!</h1>
        <Registration />
      </div>
    </div>
  );
};

export default Auth;
