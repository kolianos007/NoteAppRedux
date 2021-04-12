import { useState, useEffect } from "react";

const useValidation = (value, validations) => {
  const [isEmpty, setEmpty] = useState(false);
  const [minLengthError, setMinLengthError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [isValid, setValid] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line no-restricted-syntax
    for (const validation in validations) {
      if (Object.prototype.hasOwnProperty.call(validations, validation)) {
        switch (validation) {
          case "isEmpty":
            value
              ? setEmpty(false)
              : setEmpty("Это поле обязательное для ввода");
            break;
          case "minLength":
            value.length < validations[validation]
              ? setMinLengthError(
                  `Минимальная длина ${validations[validation]} символов`
                )
              : setMinLengthError(false);
            break;
          case "isEmail": {
            const reEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            reEmail.test(String(value).toLowerCase())
              ? setEmailError(false)
              : setEmailError("Введите корректный E-mail");
            break;
          }
          case "isPass": {
            const rePass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
            rePass.test(value)
              ? setPassError(false)
              : setPassError("Введите корректный пароль");
            break;
          }
          default:
            true;
            break;
        }
      }
    }
  }, [value]);

  useEffect(() => {
    if (isEmpty || minLengthError || passError || emailError) {
      setValid(false);
    } else {
      setValid(true);
    }
  }, [isEmpty, minLengthError, passError, emailError]);

  return {
    isEmpty,
    minLengthError,
    emailError,
    passError,
    isValid,
  };
};

const useInput = (initialValue, validations) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState(false);
  const valid = useValidation(value, validations);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    setDirty(true);
  };

  return {
    value,
    isDirty,
    onChange,
    onBlur,
    ...valid,
  };
};

export default useInput;
