import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import RegisterForm from "./components/registerForm";
import NavBar from "./components/navBar";
import NotFound from "./components/notFound";
import CardSet from "./components/cardSet";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  // const tags = ["ab", "ba", "cd", "de", "ge", "hi"];

  console.log("in App");
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/recipes">
            <CardSet />
          </Route>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route path="/register">
            <RegisterForm />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Redirect from="/" to="/recipes" />
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
