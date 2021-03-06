import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import SearchBar from "../components/SearchBar/SearchBar";
import MoviesList from "../components/MoviesList/MoviesList";
import Footer from "../components/Footer/Footer";
import { onFilter } from "./Movies";
import { deleteLike, getFavoriteMovies } from "../utils/MainApi";
import Loader from "../components/Loader/Loader";
import {
  getFavoriteMoviesFromStorage,
  setFavoriteMoviesToStorage,
} from "../utils/storage";

const SavedMovies = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentSearch, setCurrentSearch] = useState({
    search: "",
    isShort: false,
  });

  useEffect(() => {
    const favorite = getFavoriteMoviesFromStorage();
    if (favorite) {
      setMovies(favorite);
      setFilteredMovies(favorite);
      return;
    }

    setLoading(true);
    getFavoriteMovies()
      .then(({ data }) => {
        setFavoriteMoviesToStorage(data);
        setMovies(data);
        setFilteredMovies(data);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setFilteredMovies(onFilter(movies, currentSearch));
  }, [currentSearch, movies]);

  const handleSearch = (search) => setCurrentSearch(search);

  const handleRemoveMovieClick = (_id, movieId) => {
    deleteLike(_id)
      .then(() => {
        const newMovies = [...movies].filter((m) => m.movieId !== movieId);
        setMovies(newMovies);
        setFavoriteMoviesToStorage(newMovies);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Header />
      <SearchBar onSearch={handleSearch} />
      {loading ? (
        <Loader type="TailSpin" color="#fff" height={50} width={50} />
      ) : (
        <MoviesList
          error={error}
          movies={filteredMovies}
          onRemoveMovieClick={handleRemoveMovieClick}
          isFavoritePage
        />
      )}
      <Footer />
    </>
  );
};

export default SavedMovies;
