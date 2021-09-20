import getResponseData from "./api";

const BASE_URL = "https://api.movies-explorer.online";

export const register = (values) =>
  fetch(`${BASE_URL}/signup`, {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(getResponseData);

export const login = (values) =>
  fetch(`${BASE_URL}/signin`, {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(getResponseData);
