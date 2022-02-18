import React, {useState} from "react";

import TagMaker from "../common/RecipeMakers/tagMaker";
import StepMaker from "../common/RecipeMakers/stepMaker";
import AreaMaker from "../common/RecipeMakers/areaMaker";
import ImageUploader from "../common/RecipeMakers/imagesUploader";
import IngredientMaker from "../common/RecipeMakers/ingredientMaker";
import ax from "../../services/httpService"
import NavBar from "../DefaultPages/navBar";
import SubmitDiscardFooter from "../common/Buttons/submitDiscardFooter";

import "bootstrap/dist/css/bootstrap.min.css";
import "./newRecipe.css";
import cfg from "../../config.json";
import {StringArrayToBackSteps} from "../../services/Tools";
import getHeader from "../../utils/getHeader";


function NewRecipe(props) {
    console.log("props id ",props.id)
    const isEdit = !(typeof props.id === 'undefined')
    console.log("isEdit    " + isEdit)
    const username = JSON.parse(localStorage.getItem('user')).username
    const isAdmin = props.isAdmin || false;
    console.log(props.isAdmin)
    const [tags, updateTags] = useState(props.tags || []);
    const [steps, updateSteps] = useState(props.steps || []);
    const [imageUrl, updateImageUrl] = useState(props.images && props.images[0] || "");
    const [ingredients, updateIngredients] = useState(props.ingredients || []);
    const [title, updateTitle] = useState(props.title || "");
    const [type, updateType] = useState(props.type || "");
    const [body, updateBody] = useState(props.body || "");
    const [id, updateId] = useState(props.id || "");
    const [nationality, updateNationality] = useState(props.nationality || "");
    console.log("props tag", props.tags)
    console.log("tag", tags)

    function getRecipe() {
        let recipe =
            {
                name: title,
                imagePath: imageUrl,
                steps: StringArrayToBackSteps(steps),
                body: body,
                type: type,
                nationality: nationality,
                //todo
                cookingTime: 10,
                ingredients: ingredients,
                tags: tags,
                writer: JSON.parse(localStorage.getItem("user")).username
            }
        console.log("recipe    " + JSON.stringify(recipe))
        return recipe
    }

    const handleSubmit = (props) => {
        let recipe =
            {
                name: title,
                //todo
                imagePath: imageUrl,
                steps: StringArrayToBackSteps(steps),
                body: body,
                type: type,
                nationality: nationality,
                //todo
                cookingTime: 10,
                ingredients: ingredients,
                tags: tags,
                writer: JSON.parse(localStorage.getItem("user")).username
            }
        // if(isAdmin)
        window.location = "/";
        ax.post(cfg.apiUrl + "/recipe", recipe, getHeader()).then((res) => {
            console.log(res.status)
        });
        console.log((recipe))
        // //todo send backend
    };
    const handleEdit = (props) => {
        let recipe =
            {
                name: title,
                imagePath: imageUrl,
                steps: StringArrayToBackSteps(steps),
                body: body,
                type: type,
                nationality: nationality,
                //todo
                cookingTime: 10,
                ingredients: ingredients,
                tags: tags,
                writer: JSON.parse(localStorage.getItem("user")).username
            }
        console.log("recipeEdit   " + JSON.stringify(recipe))
        // window.location = "/";
        ax.put(cfg.apiUrl + "/recipe/" + id, recipe, getHeader()).then((res) => {
            console.log(res.status)
        });
    };

    const handleDiscard = (tags) => {
        window.location = "/";
        //todo send backend
    };


    return (
        <>
            <NavBar searchEnabled={false}/>
            <div className="container">
                <div className="container row">
                    <AreaMaker onChange={updateTitle} isAdmin={isAdmin} title={title}/>
                </div>
                <div className="container">
                    <div className="container row">
                        <IngredientMaker
                            onChange={updateIngredients}
                            isAdmin={isAdmin}
                            ingredients={ingredients || []}
                        />
                    </div>
                </div>
                <div className="container row">
                    <div className="col-3">
                        <TagMaker
                            onChange={updateTags}
                            isAdmin={isAdmin}
                            widthModifier="53%"
                            tags={tags || []}
                        />
                    </div>
                    <div className="col">
                        <StepMaker
                            onChange={updateSteps}
                            isAdmin={isAdmin}
                            steps={steps || []}
                        />
                    </div>
                    <div className="col-3">
                        <ImageUploader
                            onChange={updateImageUrl}
                            isAdmin={isAdmin}
                            imageURL={imageUrl || ""}
                        />{" "}
                        <AreaMaker
                            onChange={updateBody}
                            isAdmin={isAdmin}
                            title={body}
                            placeholder={"Dish Brief Description..."}
                            isNotTitle={"1"}
                            textarea={"textarea"}
                        />
                        <div className="d-flex justify-content-end">
                            <AreaMaker
                                onChange={updateNationality}
                                isAdmin={isAdmin}
                                title={nationality}
                                placeholder={"Dish Nationality..."}
                                isNotTitle={"1"}
                            />
                            <AreaMaker
                                onChange={updateType}
                                isAdmin={isAdmin}
                                title={type}
                                placeholder={"Dish Type..."}
                                isNotTitle={"1"}
                            />
                        </div>
                    </div>
                </div>
                <div className="container">
                    {isAdmin ? (isEdit ?
                        <SubmitDiscardFooter
                            onSubmit={handleEdit}
                            onDiscard={handleDiscard}
                            submitTitle="Edit"
                            discardTitle="Discard"
                        />
                        : (
                            <SubmitDiscardFooter
                                onSubmit={handleSubmit}
                                onDiscard={handleDiscard}
                                submitTitle="Submit"
                                discardTitle="Discard"
                            />
                        )) : null}
                </div>
            </div>
        </>
    );
}

export default NewRecipe;
