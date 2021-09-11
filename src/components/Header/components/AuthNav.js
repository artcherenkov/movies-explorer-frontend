import { Link } from "react-router-dom";

const AuthNav = () => (
  <div className="header__nav header__nav_type_auth">
    <Link className="link header__link header__link_type_auth" to="/signup">
      Регистрация
    </Link>
    <Link className="link header__button" to="/signin">
      Войти
    </Link>
  </div>
);

export default AuthNav;
