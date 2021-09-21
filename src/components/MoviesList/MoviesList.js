import Movie from "../Movie/Movie";

const MoviesList = (props) => {
  if (!props.movies) {
    return <h2 className="movies__not-found">Нужно ввести ключевое слово</h2>;
  }
  if (!props.movies.length) {
    return <h2 className="movies__not-found">Ничего не найдено</h2>;
  }

  return (
    <section className="movies">
      <ul className="movies__list">
        {props.movies.map((m) => (
          <li className="movies__item" key={m.movieId}>
            <Movie
              movie={m}
              favorite={props.favorites}
              onRemoveClick={props.onRemoveClick}
            />
          </li>
        ))}
      </ul>
      {props.showButton && (
        <button
          className="button movies__button-more"
          onClick={props.onMoreClick}
        >
          Ещё
        </button>
      )}
    </section>
  );
};

export default MoviesList;
