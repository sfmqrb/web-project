import React, { useState, useEffect } from "react";
import NavBar from "../DefaultPages/navBar";
import Footer from "../DefaultPages/footer";
import TagMaker from "../common/RecipeMakers/tagMaker";
import IngredientMaker from "../common/RecipeMakers/ingredientMaker";
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
        <div className="row">
          <TitleMellow title="Search" />
          <span style={{ marginLeft: "-6px" }}>
            <input
              type="text"
              className="form-control input-search-advanced m-0 mt-2 ml-4"
              placeholder="Search"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </span>
        </div>

        <div className="row">
          <div className="ml-0 p-0  mt-4">
            <TagMaker onChange={setTags} isAdmin={true} tags={[]} />
          </div>
        </div>
        <div className="row">
          <div className="container row mt-4">
            <IngredientMaker
              onChange={setIngredients}
              isAdmin={true}
              ingredients={[]}
            />
            <span className="mt-4"></span>
            <TitleMellow title={"Choose sorting algorithm"} />
          </div>
        </div>

        <div style={{ fontSize: "13px" }} className="mt-2">
          <input
            type="checkbox"
            id="basedOnLikes"
            name="basedOnLikes"
            checked={sortBy == "like"}
            onChange={() => {
              setSortBy("like");
            }}
          />
          <label className="form-check-label" for="basedOnLikes">
            Nearest in time
          </label>
          <input
            type="checkbox"
            id="basedOnTime"
            name="basedOnTime"
            checked={sortBy === "time"}
            onChange={() => setSortBy("time")}
          />
          <label className="form-check-label" for="basedOnTime">
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
      <div className="footer-fixed-bottom">
        <Footer />
      </div>
    </>
  );
};

export default SearchAdvanced;
