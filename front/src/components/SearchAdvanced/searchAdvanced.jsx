import React, { useState, useEffect } from "react";
import NavBar from "../DefaultPages/navBar";
import Footer from "../DefaultPages/footer";
import TagMaker from "../common/RecipeMakers/tagMaker";
import IngredientMaker from "../common/RecipeMakers/ingredientMaker";
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
      <div className="container  accordion-body align-middle mt-4">
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
          <div className="container row mt-4">
            <TagMaker onChange={setTags} isAdmin={true} tags={[]} />
          </div>
        </div>
        <div className="row ">
          <div className="mt-4">
            <IngredientMaker
              onChange={setIngredients}
              isAdmin={true}
              ingredients={[]}
            />
          </div>
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
      <div className="footer-fixed-bottom">
        <Footer />
      </div>
    </>
  );
};

export default SearchAdvanced;
