import cn from "classnames";

const DeleteButton = ({ onClick }) => (
  <button
    type="button"
    className={cn(
      "movie__button",
      "movie__button_type_delete",
      "movie__button_active",
      "button"
    )}
    onClick={onClick}
  />
);

export default DeleteButton;
