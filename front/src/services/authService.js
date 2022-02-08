import http from "./httpService";
import * as cfgInfo from "../config.json";
let intermediateJson = cfgInfo;
const apiUrl = intermediateJson.apiUrl;
const apiEndpoint = apiUrl + "/auth";

export function login(username, password) {
  return http.post(apiEndpoint, { username: username, password: password });
}
