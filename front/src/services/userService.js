import http from "./httpService";

import * as cfgInfo from "../config.json";
let intermediateJson = cfgInfo;
const apiUrl = intermediateJson.apiUrl;
const apiEndpoint = apiUrl + "/users";

export function register(user) {
  return http.post(apiEndpoint, {
    username: user.username,
    password: user.password,
    name: user.name,
  });
}
