export const setUserInfoInStorage = (userInfo) =>
  localStorage.setItem("userInfo", JSON.stringify(userInfo));

export const getUserInfoFromStorage = () =>
  JSON.parse(localStorage.getItem("userInfo"));

export const removeUserInfoFromStorage = () =>
  localStorage.removeItem("userInfo");

export const setBeatfilmMoviesToStorage = (beatfilmMovies) => {
  localStorage.setItem("beatfilmMovies", JSON.stringify(beatfilmMovies));
};
export const getBeatfilmMoviesFromStorage = () =>
  JSON.parse(localStorage.getItem("beatfilmMovies"));
export const setFavoriteMoviesToStorage = (movies) => {
  localStorage.setItem("movies", JSON.stringify(movies));
};
export const getFavoriteMoviesFromStorage = () =>
  JSON.parse(localStorage.getItem("movies"));


export const clearStorage = () => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("beatfilmMovies");
  localStorage.removeItem("movies");
}
