import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "../../../components/UI/Button";
import Input from "../../../components/UI/Input";
import useInput from "../../../hooks/useInput";
import s from "./Registration.module.sass";

const Registration = () => {
  const email = useInput("", { isEmpty: true, isEmail: true });
  const password = useInput("", { isEmpty: true, isPass: true });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isErrorSubmit, setErrorSubmit] = useState(false);

  const visiblePass = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  const registrationUser = async () => {
    const authData = {
      email: email.value,
      password: password.value,
      returnSecureToken: true,
    };
    try {
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCiEqKYajHZOShxkFxvEJYXoEy-hdv2fNc",
        authData
      );
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  const onClickHandler = () => {
    !email.isValid || !password.isValid
      ? setErrorSubmit(true)
      : registrationUser();
  };
  return (
    <div className={s.auth}>
      <div className="container">
        <h1>Добро пожаловать в NoteApp!</h1>
        <div className={s.authForm__wrapper}>
          <div className={s.authForm__description}>
            Чтобы продолжить, зарегистрируйтесь в приложении
          </div>
          <form className={s.authForm} onSubmit={onSubmitHandler}>
            <Input
              className="inputWrapper inputWrapper__authForm"
              inputClass={
                (isErrorSubmit && !email.isValid) ||
                (email.isDirty && (email.isEmpty || email.emailError))
                  ? "input error"
                  : "input"
              }
              type="email"
              name="email"
              placeholder="Ваш e-mail"
              onChange={email.onChange}
              value={email.value}
              onBlur={email.onBlur}
              errorMess={
                (isErrorSubmit && !email.isValid) ||
                (email.isDirty && (email.isEmpty || email.emailError))
                  ? email.isEmpty || email.emailError
                  : ""
              }
            />
            <Input
              className="inputWrapper inputWrapper__authForm"
              inputClass={
                (isErrorSubmit && !password.isValid) ||
                (password.isDirty && (password.isEmpty || password.passError))
                  ? "input error"
                  : "input"
              }
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              placeholder="Ваш пароль"
              onChange={password.onChange}
              value={password.value}
              onBlur={password.onBlur}
              icon={isPasswordVisible ? "far fa-eye" : "fas fa-eye-slash"}
              onClickIcon={visiblePass}
              errorMess={
                (isErrorSubmit && !password.isValid) ||
                (password.isDirty && (password.isEmpty || password.passError))
                  ? password.isEmpty || password.passError
                  : ""
              }
            />
            <Button
              className="btnWrapper btnWrapper__authForm"
              buttonClass="btn btn_big"
              text="Зарегистрироваться"
              onClick={onClickHandler}
            />
          </form>
          <div className={s.redirect}>
            <span>Уже зарегестрированы? </span>
            <Link to="/login">Войти</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
