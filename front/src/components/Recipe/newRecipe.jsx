import React, { Component, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import TagMaker from "../common/RecipeMakers/tagMaker";
import StepMaker from "../common/RecipeMakers/stepMaker";
import TitleMaker from "../common/RecipeMakers/titleMaker";
import ImageUploader from "../common/RecipeMakers/imagesUploader";
import IngredientMaker from "../common/RecipeMakers/ingredientMaker";

import NavBar from "../DefaultPages/navBar";
import SubmitDiscardFooter from "../common/Buttons/submitDiscardFooter";

import "bootstrap/dist/css/bootstrap.min.css";
import "./newRecipe.css";

const handleSubmit = (tags) => {
  window.location = "/";
};
const handleDiscard = (tags) => {
  window.location = "/";
};

function NewRecipe(props) {
  const isAdmin = props.isAdmin || false;

  const [tags, updateTags] = useState(props.tags || []);
  const [steps, updateSteps] = useState(props.steps || []);
  const [images, updateImages] = useState(props.images || []);
  const [ingredients, updateIngredients] = useState(props.ingredients || []);
  const [title, updateTitle] = useState(props.title || "");
  const [imageURLs, updateImageURLs] = useState([]);

  useEffect(() => {
    console.log(ingredients);
    console.log(tags);
  }, [tags, steps, images, title, ingredients]);

  return (
    <>
      <NavBar searchEnabled={false} />
      <div className="container">
        <div className="container row">
          <TitleMaker onChange={updateTitle} isAdmin={isAdmin} title={title} />
        </div>
        <div className="container row">
          <IngredientMaker
            onChange={updateIngredients}
            isAdmin={isAdmin}
            ingredients={ingredients || []}
          />
        </div>
        <div className="container row">
          <div className="container col">
            <TagMaker
              onChange={updateTags}
              isAdmin={isAdmin}
              widthModifier="34%"
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
              imageURLs={imageURLs || []}
            />
          </div>
        </div>
        <div className="container">
          {isAdmin ? (
            <SubmitDiscardFooter
              onSubmit={handleSubmit}
              onDiscard={handleDiscard}
              submitTitle="Submit"
              discardTitle="Discard"
            />
          ) : null}
        </div>
      </div>
    </>
  );
}

export default NewRecipe;
