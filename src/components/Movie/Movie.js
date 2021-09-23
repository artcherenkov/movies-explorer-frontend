import { useState } from "react";
import DeleteButton from "./components/DeleteButton";
import SaveButton from "./components/SaveButton";
import RemoveButton from "./components/RemoveButton";

const formatDuration = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration - hours * 60;
  return hours ? `${hours}ч ${minutes}м` : `${minutes}м`;
};

const Movie = (props) => {
  const { movie } = props;

  const [showSaveButton, setShowSaveButton] = useState(false);

  const onMovieMouseOver = () => setShowSaveButton(true);
  const onMovieMouseLeave = () => setShowSaveButton(false);

  const onRemoveButtonClick = () =>
    props.onRemoveClick(movie._id, movie.movieId);
  const onSaveButtonClick = () => {
    props.onSaveClick(movie);
  };

  const onMovieClick = (evt) => {
    if (evt.target.tagName.toLowerCase() === "button") {
      evt.preventDefault();
    }
  };

  const renderDefaultControls = () =>
    movie._id ? (
      <DeleteButton onClick={onRemoveButtonClick} />
    ) : (
      <SaveButton show={showSaveButton} onClick={onSaveButtonClick} />
    );

  return (
    <a
      href={movie.trailer}
      target="_blank"
      rel="noreferrer"
      onClick={onMovieClick}
      style={{ textDecoration: "none" }}
    >
      <article className="movie">
        <div
          className="movie__container"
          onMouseOver={onMovieMouseOver}
          onMouseLeave={onMovieMouseLeave}
        >
          <img className="movie__pic" src={movie.image} alt={movie.nameRU} />
          <div className="movie__info">
            <h2 className="movie__title">{movie.nameRU}</h2>
            <p className="movie__duration">{formatDuration(movie.duration)}</p>
          </div>
          {props.favorite ? (
            <RemoveButton show={showSaveButton} onClick={onRemoveButtonClick} />
          ) : (
            renderDefaultControls()
          )}
        </div>
      </article>
    </a>
  );
};

export default Movie;
