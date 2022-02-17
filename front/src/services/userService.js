import http from "./httpService";

import * as cfgInfo from "../config.json";
import Avatar from "@mui/material/Avatar";
import * as React from "react";
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
// export function
// <Avatar sx={{ bgcolor: clr }} aria-label="recipe">
//   {userName.charAt(0)}
// </Avatar>
