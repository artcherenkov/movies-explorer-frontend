import { Link } from "react-router-dom";
import cn from "classnames";

import styles from "../../Header.module.css";

const AuthLinks = () => (
  <div className={styles.authLinks}>
    <Link className={cn(styles.link, "link")} to="/signup">
      Регистрация
    </Link>
    <Link className={cn(styles.link, styles.link_filled, "link")} to="/signin">
      Войти
    </Link>
  </div>
);

export default AuthLinks;
