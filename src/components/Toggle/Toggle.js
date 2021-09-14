import cn from "classnames";

const Toggle = (props) => {
  const { isChecked, isDisabled = false, onChange, children } = props;

  return (
    <div className="search__toggle">
      <input
        className="search__toggle-input"
        type="checkbox"
        id="filmType"
        checked={isChecked}
        disabled={isDisabled}
        onChange={onChange}
      />
      <label className="search__toggle-label" htmlFor="filmType">
        {children}
        <div
          className={cn("search__input-replacement", {
            "search__input-replacement_active": isChecked,
          })}
        />
      </label>
    </div>
  );
};

export default Toggle;
