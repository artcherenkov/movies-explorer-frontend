import getResponseData from "./api";

const BASE_URL = "http://localhost:3001";

export const register = (values) =>
  fetch(`${BASE_URL}/signup`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(getResponseData);

export const login = (values) =>
  fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(getResponseData);

export const signOut = () =>
  fetch(`${BASE_URL}/signOut`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(getResponseData);

export const getUserInfo = () =>
  fetch(`${BASE_URL}/users/me`, {
    credentials: "include",
  }).then(getResponseData);

export const patchUserInfo = (data) =>
  fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    body: JSON.stringify(data),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(getResponseData);

export const getFavoriteMovies = () =>
  fetch(`${BASE_URL}/movies`, {
    credentials: "include",
  }).then(getResponseData);

export const setLike = (movie) =>
  fetch(`${BASE_URL}/movies`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(movie),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(getResponseData);

export const deleteLike = (movieId) =>
  fetch(`${BASE_URL}/movies/${movieId}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(getResponseData);
