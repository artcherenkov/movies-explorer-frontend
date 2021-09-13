import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import cn from "classnames";

import AuthNav from "./components/AuthNav";
import Nav from "./components/Nav";

const Header = (props) => {
  const { isAuth = true, className } = props;

  return (
    <header className={cn(className, "header")}>
      <nav className="header__wrapper">
        <Link className="link header__logo" to="/" />
        {isAuth ? <Nav /> : <AuthNav />}
      </nav>
    </header>
  );
};

Header.propTypes = {
  isAuth: PropTypes.bool,
  className: PropTypes.string,
};

export default Header;
