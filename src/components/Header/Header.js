import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import cn from "classnames";

import AuthLinks from "./components/AuthLinks/AuthLinks";
import Nav from "./components/Nav/Nav";

import styles from "./Header.module.css";
import "../../vendor/mixins.css";

const Header = (props) => {
  const { isAuth = true } = props;

  return (
    <header className={styles.header}>
      <nav className={styles.wrapper}>
        <Link className={cn(styles.logo, "link")} to="/" />
        {isAuth ? <Nav /> : <AuthLinks />}
      </nav>
    </header>
  );
};

Header.propTypes = {
  isAuth: PropTypes.bool,
};

export default Header;
