import { useCallback, useState } from "react";
import Loader from "react-loader-spinner";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import SearchBar from "../components/SearchBar/SearchBar";
import MoviesList from "../components/MoviesList/MoviesList";
import getResponseData from "../utils/api";

const onFilter = (movies, { search, isShort }) =>
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

const Movies = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [movies, setMovies] = useState(null);

  const handleSearch = useCallback(
    (search) => {
      // если данные не загружены, загрузим и отфильтруем
      if (!data) {
        setLoading(true);
        fetch("https://api.nomoreparties.co/beatfilm-movies")
          .then(getResponseData)
          .then((res) => {
            setData(res);
            const filtered = onFilter(res, search);
            setMovies(filtered);
          })
          .catch((err) => console.log(err))
          .finally(() => setLoading(false));
        return;
      }

      // отфильтруем данные
      const filtered = onFilter(data, search);
      setMovies(filtered);
    },
    [data]
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
