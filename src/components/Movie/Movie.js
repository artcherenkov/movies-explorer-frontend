import { useState } from "react";
import DeleteButton from "./components/DeleteButton";
import SaveButton from "./components/SaveButton";

const Movie = (props) => {
  const { movie, isFavorite: initialIsFavorite = false } = props;

  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [showSaveButton, setShowSaveButton] = useState(false);

  const onMovieMouseOver = () => setShowSaveButton(true);
  const onMovieMouseLeave = () => setShowSaveButton(false);

  const onSaveButtonClick = () => setIsFavorite(true);
  const onDeleteButtonClick = () => setIsFavorite(false);

  const formatDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration - hours * 60;
    return hours ? `${hours}ч ${minutes}м` : `${minutes}м`;
  };

  formatDuration(movie.duration);

  return (
    <article className="movie">
      <div
        className="movie__container"
        onMouseOver={onMovieMouseOver}
        onMouseLeave={onMovieMouseLeave}
      >
        <img
          className="movie__pic"
          src={`https://api.nomoreparties.co${movie.image.url}`}
          alt={movie.nameRU}
        />
        <div className="movie__info">
          <h2 className="movie__title">{movie.nameRU}</h2>
          <p className="movie__duration">{formatDuration(movie.duration)}</p>
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
