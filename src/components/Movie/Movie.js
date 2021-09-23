import { useState } from "react";
import DeleteButton from "./components/DeleteButton";
import SaveButton from "./components/SaveButton";
import { deleteLike } from "../../utils/MainApi";
import RemoveButton from "./components/RemoveButton";

const adaptMovieToServer = (movie) => {
  const adapted = { ...movie };

  delete adapted.isFavorite;
  delete adapted._id;

  return adapted;
};
const formatDuration = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration - hours * 60;
  return hours ? `${hours}ч ${minutes}м` : `${minutes}м`;
};

const Movie = (props) => {
  const { movie: initialMovie } = props;

  const [movie, setMovie] = useState(initialMovie);
  const [favorite, setFavorite] = useState(!!props.movie._id);
  const [showSaveButton, setShowSaveButton] = useState(false);

  const onMovieMouseOver = () => setShowSaveButton(true);
  const onMovieMouseLeave = () => setShowSaveButton(false);

  const onDeleteButtonClick = () => {
    deleteLike(movie._id)
      .then(() => {
        setMovie((prevMovie) => adaptMovieToServer(prevMovie));
      })
      .catch((err) => console.log(err));
  };

  const onRemoveButtonClick = () =>
    props.onRemoveClick(movie._id, movie.movieId);
  const onSaveButtonClick = () => {
    props.onSaveClick(movie);
    setFavorite(true);
  };

  const onMovieClick = (evt) => {
    if (evt.target.tagName.toLowerCase() === "button") {
      evt.preventDefault();
    }
  };

  const renderDefaultControls = () =>
    favorite ? (
      <DeleteButton onClick={onDeleteButtonClick} />
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
