import fetch from "isomorphic-fetch";
import { API } from "../config";
import { responseHandler } from "./auth";

export const userProfile = (username) => {
  return fetch(`${API}/user/${username}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.error(err));
};

export const getProfile = (token) => {
  return fetch(`${API}/user/profile`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.error(err));
};

export const updateProfile = (user, token) => {
  return fetch(`${API}/user/update`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: user,
  })
    .then((response) => {
      responseHandler(response);
      return response.json();
    })
    .catch((err) => console.error(err));
};
