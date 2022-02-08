import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/auth";

export function login(username, password) {
  return http.post(apiEndpoint, { username: username, password: password });
}
