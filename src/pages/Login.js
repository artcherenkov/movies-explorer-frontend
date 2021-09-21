import { Link } from "react-router-dom";
import validator from "validator";
import { useState } from "react";
import Loader from "react-loader-spinner";
import cn from "classnames";
import AuthForm from "../components/AuthForm/AuthForm";
import Input from "../components/Input/Input";
import useForm from "../hooks/useForm";
import { login } from "../utils/MainApi";

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const { values, handleChange, errors, setError, isValid } = useForm();

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
    login(values)
      .then(props.onSignin)
      .catch(setFetchError)
      .finally(() => setLoading(false));
  };

  return (
    <AuthForm title="Рады видеть!" onSubmit={onSubmit}>
      <Input
        label="E-mail"
        name="email"
        value={values.email}
        onChange={onChange}
        type="email"
        autoComplete="off"
        error={errors.email}
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
        required
      />
      <p className={cn("auth__error", { auth__error_show: fetchError })}>
        Произошла ошибка. Повторите попытку позже.
      </p>
      <button className="auth__submit button" type="submit" disabled={!isValid}>
        {loading ? (
          <Loader type="TailSpin" color="#fff" height={14} width={15} />
        ) : (
          "Войти"
        )}
      </button>
      <p className="auth__note">
        Ещё не зарегистрированы?{" "}
        <Link className="auth__link link" to="/signup">
          Регистрация
        </Link>
      </p>
    </AuthForm>
  );
};

export default Login;
