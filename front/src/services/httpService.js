import axios from "axios";
import logger from "./logService";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (error.response && error.response.status === 406) {
    let ext =
      window.location.href.split("/")[
        window.location.href.split("/").length - 1
      ];

    if (ext === "register") toast.error("User already registered");
    else if (ext === "login") toast.error("Wrong password or username");
  }

  if (error.response && error.response.status === 204) {
    toast.error("Receiving no note ID");
  }

  if (error.response && error.response.status === 409) {
    toast.error("Conflict with another user");
  }

  if (error.response && error.response.status === 400) {
    toast.error("Just got an bad request!");
  }

  if (error.response && error.response.status === 401) {
    toast.error("You are not authorized to perform this action.");
  }

  if (error.response && error.response.status === 429) {
    toast.error("Too many requests! Please try again later.");
  }

  if (error.response && error.response.status === 419) {
    alert("Please Login again! Your session has expired.");
    window.location = "/login";
  }

  if (!expectedError) {
    logger.log(error);
    toast.error("An unexpected error occurrred.");
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
