import { Link, NavLink } from "react-router-dom";

const Nav = () => (
  <div className="header__nav">
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
    <Link className="link header__link header__link_type_profile" to="/profile">
      Аккаунт
    </Link>
  </div>
);

export default Nav;
