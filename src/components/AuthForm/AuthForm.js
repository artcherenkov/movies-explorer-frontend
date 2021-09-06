import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../../images/logo.svg";

const AuthForm = () => {
  const [name, setName] = useState("Артём");
  const onNameChange = (evt) => setName(evt.target.value);

  return (
    <section className="auth">
      <div className="auth__container">
        <img className="auth__logo" src={logo} alt="Логотип Movies Explorer" />
        <h1 className="auth__title">Добро пожаловать!</h1>
        <form className="auth__form">
          <div className="auth__input-container">
            <label className="auth__label" htmlFor="name">
              Имя
            </label>
            <input
              className="auth__input"
              type="text"
              id="name"
              value={name}
              onChange={onNameChange}
              autoComplete="off"
            />
          </div>
          <button className="auth__submit button">Зарегистрироваться</button>
          <p className="auth__note">
            Уже зарегистрированы?{" "}
            <Link className="auth__link link" to="/signin">
              Войти
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default AuthForm;
