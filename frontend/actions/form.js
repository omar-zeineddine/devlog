import fetch from "isomorphic-fetch";
import { API } from "../config";
import { jsonHeader } from "./utils/headers";

export const emailContactForm = (data) => {
  let emailEndpoint;

  if (data.authorEmail) {
    emailEndpoint = `${API}/contact-author`;
  } else {
    emailEndpoint = `${API}/contact`;
  }
  return fetch(`${emailEndpoint}`, {
    method: "POST",
    headers: jsonHeader,
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
