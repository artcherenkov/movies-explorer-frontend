import cn from "classnames";

const DeleteButton = ({ onClick, show }) => (
  <button
    type="button"
    className={cn("movie__button", "movie__button_type_remove", "button", {
      movie__button_active: show,
    })}
    onClick={onClick}
  />
);

export default DeleteButton;
