import getResponseData from "./api";

const BASE_URL = "https://api.nomoreparties.co";

const getMovies = () =>
  fetch(`${BASE_URL}/beatfilm-movies`).then(getResponseData);

export default getMovies;
