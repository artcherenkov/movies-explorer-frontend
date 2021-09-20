import { Link } from "react-router-dom";
import validator from "validator";
import AuthForm from "../components/AuthForm/AuthForm";
import Input from "../components/Input/Input";
import useForm from "../hooks/useForm";
import { register } from "../utils/MainApi";

const Register = () => {
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
    register(values)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
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
        Зарегистрироваться
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
