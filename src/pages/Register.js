import { useState } from "react";
import { Link } from "react-router-dom";
import validator from "validator";
import Loader from "react-loader-spinner";
import cn from "classnames";
import AuthForm from "../components/AuthForm/AuthForm";
import Input from "../components/Input/Input";
import useForm from "../hooks/useForm";
import { login, register } from "../utils/MainApi";

const Register = (props) => {
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const { values, errors, isValid, setError, handleChange } = useForm();

  const onChange = (evt) => {
    handleChange(evt);
    if (evt.target.name === "email") {
      if (!validator.isEmail(evt.target.value)) {
        setError("email", "Введите валидный email.");
      }
    }
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    setLoading(true);
    register(values)
      .then(() => login({ email: values.email, password: values.password }))
      .then(props.onSignin)
      .catch(setFetchError)
      .finally(() => setLoading(false));
  };

  const pattern = String(/^[a-zA-Zа-яА-ЯёЁ\s-]+$/).replaceAll("/", "");

  return (
    <AuthForm title="Добро пожаловать!" onSubmit={onSubmit}>
      <Input
        label="Имя"
        name="name"
        value={values.name}
        onChange={onChange}
        type="text"
        autoComplete="off"
        minLength={2}
        maxLength={30}
        error={errors.name}
        pattern={pattern}
        readOnly={loading}
        required
      />
      <Input
        label="E-mail"
        name="email"
        value={values.email}
        onChange={onChange}
        type="email"
        autoComplete="off"
        error={errors.email}
        readOnly={loading}
        required
      />
      <Input
        label="Пароль"
        name="password"
        value={values.password}
        onChange={onChange}
        type="password"
        autoComplete="off"
        error={errors.password}
        minLength={8}
        readOnly={loading}
        required
      />
      <p className={cn("auth__error", { auth__error_show: fetchError })}>
        Произошла ошибка. Повторите попытку позже.
      </p>
      <button
        className="auth__submit button"
        type="submit"
        disabled={!isValid || loading}
      >
        {loading ? (
          <Loader type="TailSpin" color="#fff" height={14} width={15} />
        ) : (
          "Зарегистрироваться"
        )}
      </button>

      <p className="auth__note">
        Уже зарегистрированы?{" "}
        <Link className="auth__link link" to="/signin">
          Войти
        </Link>
      </p>
    </AuthForm>
  );
};

export default Register;
