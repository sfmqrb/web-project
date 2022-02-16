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
import NotFound from "./components/DefaultPages/notFound";
import CardSet from "./components/cardSet";
import Profile from "./components/Profiles/profile";
import ReadOnlyProfile from "./components/Profiles/readOnlyProfile";
import MoreInfoRecipe from "./components/moreInfoRecipe";
import SearchAdvanced from "./components/SearchAdvanced/searchAdvanced";

import getFakeUser from "./services/fakeUser";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/recipes" element={<CardSet />} />
          <Route exact path="/login" element={<LoginForm />} />
          <Route exact path="/register" element={<RegisterForm />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/search" element={<SearchAdvanced />} />
          <Route exact path="/profile/:id" element={<ReadOnlyProfile />} />
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
