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
import NewRecipe from "./components/newRecipe";
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
          <Route path="/new-recipe">
            <NewRecipe
              isAdmin={true}
              title={"new Recipe"}
              tags={[
                { id: "ab", text: "ab" },
                { id: "ba", text: "ba" },
              ]}
              steps={["step 1", "step 2", "step 3", "step 4"]}
              images={[
                // must be file but is not!!
                "https://unsplash.it/400/600",
                "https://unsplash.it/400/600",
              ]}
              imageURLs={[
                "https://unsplash.it/400/600",
                "https://unsplash.it/400/600",
              ]}
            />
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
