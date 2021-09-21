import { useCallback, useState } from "react";
import Loader from "react-loader-spinner";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import SearchBar from "../components/SearchBar/SearchBar";
import MoviesList from "../components/MoviesList/MoviesList";
import { getFavoriteMovies } from "../utils/MainApi";
import getMovies from "../utils/MoviesApi";

export const onFilter = (movies, { search, isShort }) =>
  movies.filter((m) => {
    const containsSearchString = m.nameRU
      .toLowerCase()
      .includes(search.toLowerCase());
    const shortFilm = m.duration <= 40;

    if (isShort) {
      return containsSearchString && shortFilm;
    }
    return containsSearchString;
  });

const adaptMovieToClient = (movie) => {
  const adapted = {
    ...movie,
    movieId: movie.id,
    image: `https://api.nomoreparties.co${movie.image.url}`,
    thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
    trailer: movie.trailerLink,
  };

  delete adapted.id;
  delete adapted.trailerLink;
  delete adapted.created_at;
  delete adapted.updated_at;

  return adapted;
};

const setMoviesFavoriteState = (movies, favoriteMovies) => {
  const favoriteMoviesIds = favoriteMovies.map((m) => m.movieId);
  return movies.map((m) => {
    if (favoriteMoviesIds.includes(m.movieId)) {
      return {
        ...m,
        isFavorite: true,
        _id: favoriteMovies.find((mov) => mov.movieId === m.movieId)._id,
      };
    }
    return m;
  });
};

const Movies = () => {
  const [loading, setLoading] = useState(false);
  const [moviesData, setMoviesData] = useState(null);
  const [movies, setMovies] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [favoriteMovies, setFavoriteMovies] = useState(null);

  const handleSearch = useCallback(
    (search) => {
      // если данные не загружены, загрузим и отфильтруем
      if (!moviesData) {
        setLoading(true);
        Promise.all([getMovies(), getFavoriteMovies()])
          .then(([data, favoriteMoviesData]) => {
            const adaptedMovies = data.map(adaptMovieToClient);
            const withFavoriteState = setMoviesFavoriteState(
              adaptedMovies,
              favoriteMoviesData.data
            );
            setMoviesData(withFavoriteState);

            const filtered = onFilter(withFavoriteState, search);
            setMovies(filtered);
          })
          .catch((err) => console.log(err))
          .finally(() => setLoading(false));
        return;
      }

      // отфильтруем данные
      const filtered = onFilter(moviesData, search);
      setMovies(filtered);
    },
    [moviesData]
  );

  return (
    <>
      <Header />
      <SearchBar onSearch={handleSearch} />
      {loading ? (
        <Loader type="TailSpin" color="#fff" height={50} width={50} />
      ) : (
        <MoviesList movies={movies} />
      )}
      <Footer />
    </>
  );
};

export default Movies;
