import React, {useEffect, useState} from "react";

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
    const isEdit = props.id !== ""
    const username = JSON.parse(localStorage.getItem('user')).username
    const isAdmin = props.isAdmin || false;
    console.log(props.isAdmin)
    const [tags, updateTags] = useState(props.tags || []);
    const [steps, updateSteps] = useState(props.steps || []);
    const [images, updateImages] = useState(props.images || []);
    const [imageUrl, updateImageUrl] = useState(props.images || "");
    const [ingredients, updateIngredients] = useState(props.ingredients || []);
    const [title, updateTitle] = useState(props.title || "");
    const [type, updateType] = useState(props.type || "");
    const [body, updateBody] = useState(props.body || "");
    const [id, updateId] = useState(props.id || "");
    const [nationality, updateNationality] = useState(props.nationality || "");
    const [imageURLs, updateImageURLs] = useState([]);

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

    console.log("isEdit    " + isEdit)
    const handleSubmit = (props) => {
        console.log(images)
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
        // ax.put(cfg.apiUrl + "/recipe/" + id, recipe, getHeader()).then((res) => {
        //     console.log(res.status)
        // });
    };

    const handleDiscard = (tags) => {
        window.location = "/";
        //todo send backend
    };

    useEffect(() => {
        if (images.length > 0) {
            console.log(images)
            console.log("image   " + images[0].name)
            ax.post(cfg.apiUrl + "/image/" + images[0].name, images[0]).then((res) => {
                console.log(res.status)
                console.log(res.data.fileName)
                updateImageUrl(res.data.fileName)
            });
        }
        updateImageUrl("")
    }, [images])
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
                            onChange={updateImages}
                            isAdmin={isAdmin}
                            images={images || []}
                            imageURLs={[imageUrl] || []}
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
