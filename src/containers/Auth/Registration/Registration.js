import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import useInput from "../../../hooks/useInput";
import s from "./Registration.module.sass";

const Registration = () => {
  const email = useInput("", { isEmpty: true, isEmail: true });
  const password = useInput("", { isEmpty: true, isPass: true });
  const name = useInput("", { isEmpty: true, minLength: 8 });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const visiblePass = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const onSubmitHandler = () => {
    email.isEmpty || password.isEmpty || name.isEmpty
      ? console.log(1)
      : console.log(2);
  };

  const onClickHandler = (e) => {
    e.preventDefault();
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
                name.isDirty && (name.isEmpty || name.minLengthError)
                  ? "input error"
                  : "input"
              }
              type="text"
              name="name"
              placeholder="Ваше имя"
              onChange={name.onChange}
              value={name.value}
              onBlur={name.onBlur}
              errorMess={
                name.isDirty && (name.isEmpty || name.minLengthError)
                  ? name.isEmpty || name.minLengthError
                  : ""
              }
            />
            <Input
              className="inputWrapper inputWrapper__authForm"
              inputClass={
                email.isDirty && (email.isEmpty || email.emailError)
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
                email.isDirty && (email.isEmpty || email.emailError)
                  ? email.isEmpty || email.emailError
                  : ""
              }
            />
            <Input
              className="inputWrapper inputWrapper__authForm"
              inputClass={
                password.isDirty && (password.isEmpty || password.passError)
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
                password.isDirty && (password.isEmpty || password.passError)
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
