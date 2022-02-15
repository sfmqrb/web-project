import React, { useState, useEffect } from "react";
import NavBar from "../navBar";
import Footer from "../footer";
import TitleMellow from "../common/Titles/titleMellow";
import "./searchAdvanced.css";

const SearchAdvanced = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [tags, setTags] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [sortBy, setSortBy] = useState("like"); // also by time

  const handleSubmit = () => {
    console.log(searchQuery);
  };

  return (
    <>
      <NavBar searchEnabled={false} />
      <div className="container">
        <div className="row ">
          <span className="mt--4 font-awesome">
            Search by Text
            <div className="font-small">
              Get recipes if query is specified in it!
            </div>
          </span>

          <input
            type="text"
            className="form-control input-search-advanced"
            placeholder="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="row">
          <span className="mt--4 font-awesome">
            Search by Tags
            <div className="font-small">place '-' between tags please!</div>
          </span>
          <input
            type="text"
            className="form-control input-search-advanced"
            placeholder="Tags"
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <div className="row ">
          <span className="mt--4 font-awesome">
            Search by Ingredients
            <div className="font-small">
              place '-' between Ingredients please!
            </div>
          </span>
          <input
            type="text"
            className="form-control input-search-advanced"
            placeholder="Ingredients"
            onChange={(e) => setIngredients(e.target.value)}
          />
        </div>
        <span className="mt--4 font-awesome">Choose sorting algorithm</span>

        <div style={{ fontSize: "13px" }}>
          <input
            type="checkbox"
            id="likesss"
            name="likesss"
            checked={sortBy == "like"}
            onChange={() => {
              setSortBy("like");
            }}
          />
          <label className="form-check-label" for="likesss">
            Nearest in time
          </label>
          <input
            type="checkbox"
            id="timeee"
            name="timeee"
            checked={sortBy === "time"}
            onChange={() => setSortBy("time")}
          />
          <label className="form-check-label" for="timeee">
            Liked the most
          </label>
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-4"
          onClick={handleSubmit}>
          Search
        </button>
      </div>
      <div style={{ bottom: "0", position: "fixed", width: "100%" }}>
        <Footer />
      </div>
    </>
  );
};

export default SearchAdvanced;
