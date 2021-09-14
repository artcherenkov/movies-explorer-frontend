import { Link } from "react-router-dom";
import { useState } from "react";
import AuthForm from "../components/AuthForm/AuthForm";
import Input from "../components/Input/Input";

const Register = () => {
  const [name, setName] = useState("Артём");
  const [email, setEmail] = useState("someemail@gmail.com");
  const [password, setPassword] = useState("strongpassword");

  const onNameChange = (evt) => setName(evt.target.value);
  const onEmailChange = (evt) => setEmail(evt.target.value);
  const onPasswordChange = (evt) => setPassword(evt.target.value);

  const onSubmit = (evt) => {
    evt.preventDefault();
    console.log(
      `name: ${name}\n`,
      `email: ${email}\n`,
      `password: ${password}\n`
    );
  };

  return (
    <AuthForm title="Добро пожаловать!" onSubmit={onSubmit}>
      <Input
        label="Имя"
        value={name}
        onChange={onNameChange}
        type="text"
        autoComplete="off"
      />
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
