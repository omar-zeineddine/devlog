import fetch from "isomorphic-fetch";
import { API } from "../config";

export const createBlog = (blog, token) => {
  return fetch(`${API}/blog`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: blog,
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));
};

export const listBlogsWithCategoriesAndTags = (skip, limit) => {
  const data = {
    limit,
    skip,
  };
  return fetch(`${API}/blogs-categories-tags`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    // send skip and limit data from client side to backend
    /* body: JSON.stringify(data), */
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));
};

export const getRelatedBlogs = (blog) => {
  return fetch(`${API}/blogs/related`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blog),
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));
};

export const showBlog = (slug) => {
  return fetch(`${API}/blog/${slug}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));
};
