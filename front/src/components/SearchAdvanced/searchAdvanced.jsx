import React, {useState} from "react";
import NavBar from "../DefaultPages/navBar";
import Footer from "../DefaultPages/footer";
import TagMaker from "../common/RecipeMakers/tagMaker";
import IngredientMaker from "../common/RecipeMakers/ingredientMaker";
import TitleMellow from "../common/Titles/titleMellow";
import ax from "../../services/httpService"
import "./searchAdvanced.css";
import {backRecipeToFrontRecipe, ingredientsToKeyArray, tagsToKeyArray} from "../common/commonUtils/EntitieHandeler";
import cfg from "../../config.json";
import getHeader from "../../utils/getHeader";
import {TokenIsExpires} from "../../services/Tools";

const SearchAdvanced = (props) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [tags, setTags] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [sortBy, setSortBy] = useState("like"); // also by time

    const handleSubmit = () => {
        //todo post to back
        console.log(searchQuery);
        console.log(tagsToKeyArray(tags))
        console.log(ingredientsToKeyArray(ingredients))
        console.log(sortBy)
        let orderBy = "cookingTime"
        if(sortBy === "like"){
            orderBy = "stars"
        }
        let req = {
            ingsIn: ingredientsToKeyArray(ingredients),
            ingsOut: [],
            tagsIn: tagsToKeyArray(tags),
            tagsOut: [],
            orderBy: orderBy,
            ascending: true,
            searchText: searchQuery
        }

        ax.post(cfg.apiUrl + "/recipe/find",req , getHeader()).then((res) => {
            console.log(res);
            if (res.status === 203){
                TokenIsExpires()
                return
            }
            let recipes = []
            res.data.forEach((item, index) => {
                recipes.push(backRecipeToFrontRecipe(item))
            })
            localStorage.setItem("CostumeRecipes", JSON.stringify(recipes))
            window.location = "/recipes/result"
        });


    };

    return (
        <>
            <NavBar searchEnabled={false}/>
            <div className="container">
                <div className="row">
                    <TitleMellow title="Search"/>
                    <span style={{marginLeft: "-6px"}}>
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
                        <TagMaker onChange={setTags} isAdmin={true} tags={[]}/>
                    </div>
                </div>
                <div className="row">
                    <div className="container row mt-4">
                        <IngredientMaker
                            onChange={setIngredients}
                            isAdmin={true}
                            ingredients={[]}
                        />
                        <span className="mt-4"/>
                        <TitleMellow title={"Choose sorting algorithm"}/>
                    </div>
                </div>

                <div style={{fontSize: "13px"}} className="mt-2">
                    <input
                        type="checkbox"
                        id="basedOnLikes"
                        name="basedOnLikes"
                        checked={sortBy == "like"}
                        onChange={() => {
                            setSortBy("like");
                        }}
                    />
                    <label className="form-check-label" htmlFor="basedOnLikes">
                        Nearest in time
                    </label>
                    <input
                        type="checkbox"
                        id="basedOnTime"
                        name="basedOnTime"
                        checked={sortBy === "time"}
                        onChange={() => setSortBy("time")}
                    />
                    <label className="form-check-label" htmlFor="basedOnTime">
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
                <Footer/>
            </div>
        </>
    );
};

export default SearchAdvanced;
