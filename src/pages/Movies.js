import { useCallback, useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import SearchBar from "../components/SearchBar/SearchBar";
import MoviesList from "../components/MoviesList/MoviesList";
import { deleteLike, getFavoriteMovies, setLike } from "../utils/MainApi";
import getMovies from "../utils/MoviesApi";
import Loader from "../components/Loader/Loader";
import useWindowSize from "../hooks/useWindowSize";
import {
  getBeatfilmMoviesFromStorage,
  getFavoriteMoviesFromStorage,
  setBeatfilmMoviesToStorage,
  setFavoriteMoviesToStorage,
} from "../utils/storage";
import { Breakpoint, SHORT_MOVIE_DURATION } from "../utils/const";

export const onFilter = (movies, { search, isShort }) =>
  movies.filter((m) => {
    const containsSearchString = m.nameRU
      .toLowerCase()
      .includes(search.toLowerCase());
    const shortFilm = m.duration <= SHORT_MOVIE_DURATION;

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
      // фильм, встречающийся и в списке beatfilm, и в списке избранных
      const intersectedMovie = favoriteMovies.find(
        (mov) => mov.movieId === m.movieId
      );

      return { ...m, _id: intersectedMovie._id };
    }
    return m;
  });
};

export const processMovieData = (beatfilms, favorites) => {
  const adaptedMovies = beatfilms.map(adaptMovieToClient);
  return setMoviesFavoriteState(adaptedMovies, favorites);
};

const Movies = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [moviesData, setMoviesData] = useState(null);
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    const beatfilm = getBeatfilmMoviesFromStorage();
    const favorites = getFavoriteMoviesFromStorage();

    if (beatfilm && favorites) {
      const withFavoriteState = processMovieData(beatfilm, favorites);
      setMoviesData(withFavoriteState);
    }
  }, []);

  const handleSearch = useCallback(
    (search) => {
      // если данные не загружены, загрузим и отфильтруем
      if (!moviesData) {
        setLoading(true);
        Promise.all([getMovies(), getFavoriteMovies()])
          .then(([beatfilm, { data: favorites }]) => {
            setBeatfilmMoviesToStorage(beatfilm);
            setFavoriteMoviesToStorage(favorites);

            const withFavoriteState = processMovieData(beatfilm, favorites);
            setMoviesData(withFavoriteState);

            const filtered = onFilter(withFavoriteState, search);
            setMovies(filtered);
          })
          .catch((err) => setError(err))
          .finally(() => setLoading(false));
        return;
      }

      // отфильтруем данные
      const filtered = onFilter(moviesData, search);
      setMovies(filtered);
    },
    [moviesData]
  );

  const [cardsPaging, setCardsPaging] = useState({
    total: Breakpoint.L.totalCards,
    perPage: Breakpoint.L.perPage,
  });
  const [cardsCount, setCardsCount] = useState(cardsPaging.total);

  const { width } = useWindowSize();

  const onMoreClick = useCallback(() => {
    setCardsCount(cardsCount + cardsPaging.perPage);
  }, [cardsCount, cardsPaging]);

  const handleSaveMovieClick = (movie) => {
    setLike(movie)
      .then(({ data }) => {
        const newMovies = [...movies];
        const likedMovieIndex = newMovies.findIndex(
          (m) => m.movieId === movie.movieId
        );
        newMovies[likedMovieIndex] = { ...movie, _id: data._id };
        setMovies(newMovies);

        const favoriteMovies = getFavoriteMoviesFromStorage();
        setFavoriteMoviesToStorage([...favoriteMovies, data]);
      })
      .catch((err) => console.log(err));
  };

  const handleRemoveMovieClick = (_id) => {
    deleteLike(_id)
      .then(() => {
        const newMovies = [...movies];

        const removedMovieIndex = newMovies.findIndex((m) => m._id === _id);
        const removedMovie = newMovies[removedMovieIndex];
        delete removedMovie._id;
        newMovies[removedMovieIndex] = removedMovie;

        setMovies(newMovies);
        const favoriteMovies = getFavoriteMoviesFromStorage().filter(
          (m) => m._id !== _id
        );
        setFavoriteMoviesToStorage(favoriteMovies);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setCardsCount(cardsPaging.total);
  }, [movies, cardsPaging]);

  useEffect(() => {
    if (width >= Breakpoint.L.width) {
      setCardsPaging({
        total: Breakpoint.L.totalCards,
        perPage: Breakpoint.L.perPage,
      });
    } else if (width >= Breakpoint.M.width) {
      setCardsPaging({
        total: Breakpoint.M.totalCards,
        perPage: Breakpoint.M.perPage,
      });
    } else {
      setCardsPaging({
        total: Breakpoint.S.totalCards,
        perPage: Breakpoint.S.perPage,
      });
    }
  }, [width]);

  return (
    <>
      <Header />
      <SearchBar onSearch={handleSearch} />
      {loading ? (
        <Loader type="TailSpin" color="#fff" height={50} width={50} />
      ) : (
        <MoviesList
          error={error}
          movies={movies?.slice(0, cardsCount)}
          onMoreClick={onMoreClick}
          showButton={cardsCount < movies?.length}
          onSaveMovieClick={handleSaveMovieClick}
          onRemoveMovieClick={handleRemoveMovieClick}
        />
      )}
      <Footer />
    </>
  );
};

export default Movies;
