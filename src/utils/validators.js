export const required = (values) => {
  if (values) return "";
  return "Это поле обязательное";
};

export const minLength = (values) => {
  if (values.length < 6) return "Минимальная длина 6 символов";
  return "";
};

export const emailValid = (values) => {
  const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  !re.test(values) ? "Введите корректный email" : "";
};

export const passwordValid = (values) => {
  const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
  !re.test(values)
    ? "Пароль должен содержать минимум 6 символов, одну букву и цифру"
    : "";
};
