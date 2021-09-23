import cn from "classnames";
import validator from "validator";

import { useContext, useEffect, useState } from "react";
import { patchUserInfo, signOut } from "../../utils/MainApi";
import useForm from "../../hooks/useForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const messageStyle = {
  color: "white",
  position: "absolute",
  top: -50,
  margin: 0,
  textAlign: "center",
  width: "100%",
  fontFamily: "var(--font-inter)",
};

const Profile = (props) => {
  const currentUser = useContext(CurrentUserContext);
  const [isSameData, setIsSameData] = useState(true);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // скрывать сообщение об успешном изменении профиля
  useEffect(() => {
    if (message) {
      setTimeout(() => setMessage(""), 3000);
    }
  }, [message]);

  const { values, handleChange, errors, setError, isValid } = useForm({
    name: currentUser.name,
    email: currentUser.email,
  });

  useEffect(() => {
    const newIsSameData =
      values.name === currentUser.name && values.email === currentUser.email;

    setIsSameData(newIsSameData);
  }, [values, currentUser]);

  const onSignOutClick = () => signOut().then(props.onSignout);
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
    patchUserInfo({ name: values.name, email: values.email })
      .then(props.onUserInfoChange)
      .then(() => setMessage("Ваш профиль успешно обновлен."))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const pattern = String(/^[a-zA-Zа-яА-ЯёЁ\s-]+$/).replaceAll("/", "");

  return (
    <section className="profile">
      <div className="profile__container">
        <h1 className="profile__header">Привет, {currentUser.name}!</h1>
        <form className="profile__form" onSubmit={onSubmit}>
          {message && <p style={messageStyle}>{message}</p>}
          <div className="profile__input-wrapper">
            <label className="profile__label" htmlFor="name">
              Имя
            </label>
            <input
              className={cn("profile__input", {
                profile__input_error: errors.name,
              })}
              name="name"
              type="text"
              id="name"
              value={values.name}
              required
              minLength={2}
              maxLength={30}
              onChange={onChange}
              readOnly={loading}
              pattern={pattern}
            />
            <span className="profile__error">{errors.name}</span>
          </div>
          <div className="profile__input-wrapper">
            <label className="profile__label" htmlFor="email">
              E-mail
            </label>
            <input
              className={cn("profile__input", {
                profile__input_error: errors.email,
              })}
              name="email"
              type="email"
              id="email"
              value={values.email}
              required
              onChange={onChange}
              readOnly={loading}
            />
            <span className="profile__error">{errors.email}</span>
          </div>
          <button
            className={cn(
              "profile__button",
              "profile__button_type_submit",
              "button"
            )}
            disabled={!isValid || isSameData || loading}
          >
            Редактировать
          </button>
          <button
            onClick={onSignOutClick}
            type="button"
            className={cn(
              "profile__button",
              "profile__button_type_signout",
              "button"
            )}
            disabled={loading}
          >
            Выйти из аккаунта
          </button>
        </form>
      </div>
    </section>
  );
};

export default Profile;
