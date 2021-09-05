import { useState } from "react";
import DeleteButton from "./components/DeleteButton";
import SaveButton from "./components/SaveButton";

const Movie = (props) => {
  const { src, isFavorite: initialIsFavorite = false } = props;

  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [showSaveButton, setShowSaveButton] = useState(false);

  const onMovieMouseOver = () => setShowSaveButton(true);
  const onMovieMouseLeave = () => setShowSaveButton(false);

  const onSaveButtonClick = () => setIsFavorite(true);
  const onDeleteButtonClick = () => setIsFavorite(false);

  return (
    <article className="movie">
      <div
        className="movie__container"
        onMouseOver={onMovieMouseOver}
        onMouseLeave={onMovieMouseLeave}
      >
        <img className="movie__pic" src={src} alt="33 слова о дизайне" />
        <div className="movie__info">
          <h2 className="movie__title">33 слова о дизайне</h2>
          <p className="movie__duration">1ч 17м</p>
        </div>
        {isFavorite ? (
          <DeleteButton onClick={onDeleteButtonClick} />
        ) : (
          <SaveButton show={showSaveButton} onClick={onSaveButtonClick} />
        )}
      </div>
    </article>
  );
};

export default Movie;
