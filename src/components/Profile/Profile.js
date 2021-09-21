import { useState } from "react";
import cn from "classnames";
import { signOut } from "../../utils/MainApi";

const Profile = (props) => {
  const [name, setName] = useState("Артём");
  const [email, setEmail] = useState("someemail@gmail.com");

  const onNameChange = (evt) => setName(evt.target.value);
  const onEmailChange = (evt) => setEmail(evt.target.value);

  const onSignOutClick = () => signOut().then(props.onSignout);

  return (
    <section className="profile">
      <div className="profile__container">
        <h1 className="profile__header">Привет, Артём!</h1>
        <form className="profile__form">
          <div className="profile__input-wrapper">
            <label className="profile__label" htmlFor="name">
              Имя
            </label>
            <input
              className="profile__input"
              type="text"
              id="name"
              value={name}
              onChange={onNameChange}
            />
          </div>
          <div className="profile__input-wrapper">
            <label className="profile__label" htmlFor="email">
              E-mail
            </label>
            <input
              className="profile__input"
              type="email"
              id="email"
              value={email}
              onChange={onEmailChange}
            />
          </div>
          <button
            className={cn(
              "profile__button",
              "profile__button_type_submit",
              "button"
            )}
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
          >
            Выйти из аккаунта
          </button>
        </form>
      </div>
    </section>
  );
};

export default Profile;
