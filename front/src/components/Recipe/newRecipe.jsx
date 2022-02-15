import React, { Component, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import TagMaker from "../common/RecipeMakers/tagMaker";
import StepMaker from "../common/RecipeMakers/stepMaker";
import TitleMaker from "../common/RecipeMakers/titleMaker";
import ImageUploader from "../common/RecipeMakers/imagesUploader";
import NavBar from "../navBar";
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
  const [title, updateTitle] = useState(props.title || "");

  useEffect(() => {
    console.log(tags);
    console.log(steps);
    console.log(images);
    console.log(title);
  }, [tags, steps, images, title]);

  // if (!isAdmin) {
  //   return <Redirect to="/" />;
  // }
  return (
    <>
      <NavBar searchEnabled={false} />
      <div className="container row">
        <TitleMaker
          onChange={updateTitle}
          isAdmin={isAdmin}
          title={props.title || ""}
        />
      </div>
      <div className="container row">
        <div className="col-3">
          <TagMaker
            onChange={updateTags}
            isAdmin={isAdmin}
            tags={props.tags || []}
          />
        </div>
        <div className="col">
          <StepMaker
            onChange={updateSteps}
            isAdmin={isAdmin}
            steps={props.steps || []}
          />
        </div>
        <div className="col-3">
          <ImageUploader
            onChange={updateImages}
            isAdmin={isAdmin}
            images={props.images || []}
            imageURLs={props.imageURLs || []}
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
    </>
  );
}

export default NewRecipe;
