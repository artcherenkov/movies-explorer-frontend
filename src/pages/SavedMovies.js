import { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import Header from "../components/Header/Header";
import SearchBar from "../components/SearchBar/SearchBar";
import MoviesList from "../components/MoviesList/MoviesList";
import Footer from "../components/Footer/Footer";
import { onFilter } from "./Movies";
import { getFavoriteMovies } from "../utils/MainApi";

const SavedMovies = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentSearch, setCurrentSearch] = useState({
    search: "",
    isShort: false,
  });

  useEffect(() => {
    setLoading(true);
    getFavoriteMovies()
      .then(({ data }) => {
        setMovies(data);
        setFilteredMovies(data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setFilteredMovies(onFilter(movies, currentSearch));
  }, [currentSearch, movies]);

  const handleSearch = (search) => setCurrentSearch(search);

  const handleRemoveMovieClick = (movieId) => {
    const newMovies = [...movies].filter((m) => m.movieId !== movieId);
    setMovies(newMovies);
  };

  return (
    <>
      <Header />
      <SearchBar onSearch={handleSearch} />
      {loading ? (
        <Loader type="TailSpin" color="#fff" height={50} width={50} />
      ) : (
        <MoviesList
          movies={filteredMovies}
          onRemoveClick={handleRemoveMovieClick}
          favorites
        />
      )}
      <Footer />
    </>
  );
};

export default SavedMovies;
