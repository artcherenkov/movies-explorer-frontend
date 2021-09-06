import { Link } from "react-router-dom";
import { useState } from "react";
import AuthForm from "../components/AuthForm/AuthForm";
import Input from "../components/Input/Input";

const Login = () => {
  const [email, setEmail] = useState("someemail@gmail.com");
  const [password, setPassword] = useState("strongpassword");

  const onEmailChange = (evt) => setEmail(evt.target.value);
  const onPasswordChange = (evt) => setPassword(evt.target.value);

  const onSubmit = (evt) => {
    evt.preventDefault();
    console.log(`email: ${email}\n`, `password: ${password}\n`);
  };

  return (
    <AuthForm title="Рады видеть!" onSubmit={onSubmit}>
      <Input
        label="E-mail"
        value={email}
        onChange={onEmailChange}
        type="email"
        autoComplete="off"
      />
      <Input
        label="Пароль"
        value={password}
        onChange={onPasswordChange}
        type="password"
        autoComplete="off"
        error={1}
      />
      <button className="auth__submit button" type="submit">
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
