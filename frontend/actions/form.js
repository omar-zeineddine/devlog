import fetch from "isomorphic-fetch";
import { API } from "../config";

export const emailContactForm = (data) => {
  let emailEndpoint;

  if (data.authorEmail) {
    emailEndpoint = `${API}/contact-author`;
  } else {
    emailEndpoint = `${API}/contact`;
  }

  return fetch(emailEndpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));
};
