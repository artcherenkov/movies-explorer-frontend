import { useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import cn from "classnames";

import AuthNav from "./components/AuthNav";
import Nav from "./components/Nav";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const Header = (props) => {
  const { className } = props;
  const userData = useContext(CurrentUserContext) || {};

  return (
    <header className={cn(className, "header")}>
      <nav className="header__wrapper">
        <Link className="link header__logo" to="/" />
        {userData.email ? <Nav /> : <AuthNav />}
      </nav>
    </header>
  );
};

Header.propTypes = {
  isAuth: PropTypes.bool,
  className: PropTypes.string,
};

export default Header;
