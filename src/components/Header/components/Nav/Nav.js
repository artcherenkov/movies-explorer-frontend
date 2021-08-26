import { Link, NavLink } from "react-router-dom";
import cn from "classnames";
import styles from "./Nav.module.css";

const Nav = () => (
  <div className={styles.nav}>
    <NavLink
      className={cn(styles.link, "link")}
      activeClassName={styles.link_active}
      to="/movies"
    >
      Фильмы
    </NavLink>
    <NavLink
      className={cn(styles.link, "link")}
      activeClassName={styles.link_active}
      to="/saved-movies"
    >
      Сохраненные фильмы
    </NavLink>
    <Link
      className={cn(styles.link, styles.link_type_profile, "link")}
      to="/profile"
    >
      Аккаунт
    </Link>
  </div>
);

export default Nav;
