import { useCallback, useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import SearchBar from "../components/SearchBar/SearchBar";
import MoviesList from "../components/MoviesList/MoviesList";
import { getFavoriteMovies } from "../utils/MainApi";
import getMovies from "../utils/MoviesApi";
import Loader from "../components/Loader/Loader";
import useWindowSize from "../hooks/useWindowSize";

const Breakpoint = {
  L: {
    width: 1200,
    totalCards: 12,
    perPage: 3,
  },
  M: {
    width: 768,
    totalCards: 8,
    perPage: 2,
  },
  S: {
    width: 360,
    totalCards: 5,
    perPage: 2,
  },
};

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

const setBeatFilmMoviesToStorage = (beatfilmMovies) => {
  localStorage.setItem("beatfilmMovies", JSON.stringify(beatfilmMovies));
};

const getBeatfilmMoviesFromStorage = () =>
  JSON.parse(localStorage.getItem("beatfilmMovies"));

const setFavoriteMoviesToStorage = (movies) => {
  localStorage.setItem("movies", JSON.stringify(movies));
};

const getFavoriteMoviesFromStorage = () =>
  JSON.parse(localStorage.getItem("movies"));

const processMovieData = (bf, f) => {
  const adaptedMovies = bf.map(adaptMovieToClient);
  return setMoviesFavoriteState(adaptedMovies, f);
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
          .then(([data, favoriteMoviesData]) => {
            setBeatFilmMoviesToStorage(data);
            setFavoriteMoviesToStorage(favoriteMoviesData.data);

            const withFavoriteState = processMovieData(
              data,
              favoriteMoviesData.data
            );
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
        />
      )}
      <Footer />
    </>
  );
};

export default Movies;
