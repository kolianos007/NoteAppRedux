import React from "react";
import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import s from "./Registration.module.sass";

const Registration = () => {
  const onSubmitHandler = () => {};

  const onClickHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className={s.authForm__wrapper}>
      <div className={s.authForm__description}>
        Чтобы продолжить, зарегистрируйтесь в приложении
      </div>
      <form className={s.authForm} onSubmit={onSubmitHandler}>
        <Input
          className="inputWrapper inputWrapper__authForm"
          inputClass="input"
          type="text"
          name="username"
          placeholder="Ваше имя"
        />
        <Input
          className="inputWrapper inputWrapper__authForm"
          inputClass="input"
          type="email"
          name="email"
          placeholder="Ваш e-mail"
        />
        <Input
          className="inputWrapper inputWrapper__authForm"
          inputClass="input"
          type="password"
          name="password"
          placeholder="Ваш пароль"
        />
        <Button
          className="btnWrapper btnWrapper__authForm"
          buttonClass="btn btn_big"
          text="Зарегистрироваться"
          onClick={onClickHandler}
        />
      </form>
    </div>
  );
};

export default Registration;
