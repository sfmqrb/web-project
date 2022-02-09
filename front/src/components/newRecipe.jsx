import React, { Component, useState, useEffect } from "react";
import TagMaker from "./common/tagMaker";
import StepMaker from "./common/stepMaker";
import ImageUploader from "./common/imagesUploader";

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
      <TagMaker onChange={updateTags} />
      <StepMaker onChange={updateSteps} />
      <ImageUploader onChange={updateImages} />
      <button onClick={() => handleClick(tags)}>Submit</button>
    </>
  );
}

export default NewRecipe;
