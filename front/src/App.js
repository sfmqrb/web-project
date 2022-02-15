import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import RegisterForm from "./components/registerForm";
import NewRecipe from "./components/Recipe/newRecipe";
import NotFound from "./components/notFound";
import CardSet from "./components/cardSet";
import Profile from "./components/profile";
import MoreInfoRecipe from "./components/moreInfoRecipe";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Routes>
          <Route exact path="/recipes" element={<CardSet />} />

          <Route exact path="/login" element={<LoginForm />} />
          <Route exact path="/register" element={<RegisterForm />} />

          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route
            exact
            path="/new-recipe"
            element={<NewRecipe isAdmin={true} />}
          />
          <Route exact path="/recipe/:id" element={<MoreInfoRecipe />} />
          <Route path="/" element={<Navigate to="/recipes" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
