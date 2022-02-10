import React, { Component, useState, useEffect } from "react";
import TagMaker from "./common/tagMaker";
import StepMaker from "./common/stepMaker";
import ImageUploader from "./common/imagesUploader";
import "bootstrap/dist/css/bootstrap.min.css";

const handleClick = (tags) => {
  console.log("The button was clicked");
  console.log(tags, "button tags");
};

function NewRecipe() {
  const [tags, updateTags] = useState([]);
  const [steps, updateSteps] = useState([]);
  const [images, updateImages] = useState([]);

  useEffect(() => {
    console.log(tags, "useEffect tags");
    console.log(steps, "useEffect steps");
    console.log(images, "useEffect images");
  }, [tags, steps, images]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-3">
            <TagMaker onChange={updateTags} />
          </div>
          <div className="col">
            <StepMaker onChange={updateSteps} />
          </div>
          <div className="col">
            <ImageUploader onChange={updateImages} />
          </div>
        </div>

        <div className="row">
          <div className="col"></div>
          <div className="col"></div>
          <div className="col centered">
            <button onClick={() => handleClick(tags)}>Submit</button>
          </div>

          <div className="col"></div>
          <div className="col"></div>
        </div>
      </div>
    </>
  );
}

export default NewRecipe;
