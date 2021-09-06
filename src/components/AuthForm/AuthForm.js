import logo from "../../images/logo.svg";

const AuthForm = ({ title, onSubmit, children }) => (
  <section className="auth">
    <div className="auth__container">
      <img className="auth__logo" src={logo} alt="Логотип Movies Explorer" />
      <h1 className="auth__title">{title}</h1>
      <form className="auth__form" onSubmit={onSubmit}>
        {children}
      </form>
    </div>
  </section>
);

export default AuthForm;
