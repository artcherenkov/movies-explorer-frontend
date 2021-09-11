import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import cn from "classnames";

const Nav = () => {
  const [showNav, setShowNav] = useState(false);

  const onBurgerClick = () => setShowNav(!showNav);
  const onCloseNavClick = () => setShowNav(false);

  return (
    <>
      <button className="header__burger button" onClick={onBurgerClick} />
      <div
        className={cn("header__nav header__nav_type_menu", {
          header__nav_open: showNav,
        })}
      >
        <button
          className="header__close-nav button"
          onClick={onCloseNavClick}
        />
        <NavLink
          className="link header__link header__link_mobile"
          activeClassName="header__link_active"
          exact
          to="/"
        >
          Главная
        </NavLink>
        <NavLink
          className="link header__link"
          activeClassName="header__link_active"
          to="/movies"
        >
          Фильмы
        </NavLink>
        <NavLink
          className="link header__link"
          activeClassName="header__link_active"
          to="/saved-movies"
        >
          Сохраненные фильмы
        </NavLink>
        <Link
          className="link header__link header__link_type_profile"
          to="/profile"
        >
          Аккаунт
        </Link>
      </div>
    </>
  );
};

export default Nav;
