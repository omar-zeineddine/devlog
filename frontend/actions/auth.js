import fetch from "isomorphic-fetch";
import { API } from "../config";
import cookie from "js-cookie";

export const preSignup = (user) => {
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const signin = (user) => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const logout = (next) => {
  removeCookie("token");
  removeLocalStorage("token");
  next();

  return fetch(`${API}/logout`, {
    method: "GET",
  })
    .then((res) => {
      console.log("user logged out");
    })
    .catch((err) => console.log(err));
};

// storing user information before authentication

// local storage

export const setLocalStorage = (key, value) => {
  if (typeof window !== "undefined") {
    // run client side only
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeLocalStorage = (key) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

// cookie management

export const getCookie = (key) => {
  if (typeof window !== "undefined") {
    return cookie.get(key);
  }
};

export const setCookie = (key, value) => {
  if (typeof window !== "undefined") {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

export const removeCookie = (key) => {
  if (typeof window !== "undefined") {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

// authenticate user by passing data to local storage and cookie
export const authenticate = (data, next) => {
  // save data to local storage
  setLocalStorage("user", data.user);

  // set the cookie
  setCookie("token", data.token);

  next();
};

// return authenticated user's information from local storage
export const isAuthenticated = () => {
  if (typeof window !== "undefined") {
    // if there is a token in the cookie, then we have a user
    const checkCookie = getCookie("token");

    // if there is a cookie, get the 'user' item from the local storage
    if (checkCookie) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  }
};
