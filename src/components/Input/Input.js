import cn from "classnames";

const Input = (props) => (
  <div className="auth__input-container">
    <label className="auth__label" htmlFor="name">
      {props.label}
    </label>
    <input
      className={cn("auth__input", { auth__input_error: props.error })}
      {...props}
    />
    {props.error && (
      <span className="auth__error-msg">Что-то пошло не так...</span>
    )}
  </div>
);

export default Input;
