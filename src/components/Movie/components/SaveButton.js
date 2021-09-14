import cn from "classnames";

const SaveButton = ({ show, onClick }) => (
  <button
    type="button"
    className={cn("movie__button", "movie__button_type_save", "button", {
      movie__button_active: show,
    })}
    onClick={onClick}
  >
    Сохранить
  </button>
);

export default SaveButton;
