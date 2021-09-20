import { Link } from "react-router-dom";
import validator from "validator";
import AuthForm from "../components/AuthForm/AuthForm";
import Input from "../components/Input/Input";
import { login } from "../utils/MainApi";
import useForm from "../hooks/useForm";

const Login = () => {
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
    login(values)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
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
      <button className="auth__submit button" type="submit" disabled={!isValid}>
        Войти
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
