import React, { Component, useState, useEffect } from "react";
import TagMaker from "./common/tagMaker";
import StepMaker from "./common/stepMaker";
import ImageUploader from "./common/imagesUploader";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./navBar";
import "./newRecipe.css";

const handleClick = (tags) => {
  window.location = "/";
};

function NewRecipe() {
  const [tags, updateTags] = useState([]);
  const [steps, updateSteps] = useState([]);
  const [images, updateImages] = useState([]);

  useEffect(() => {
    // console.log("Running useEffect", tags);
    // console.log(steps, "In newRecipe :: steps");
    console.log(images, "useEffect images");
  }, [tags, steps, images]);

  return (
    <>
      <NavBar searchEnabled={false} />
      <div className="container">
        <div className="row">
          <div className="col-3">
            <TagMaker onChange={updateTags} />
          </div>
          <div className="col">
            <StepMaker onChange={updateSteps} />
          </div>
          <div className="col-3">
            <ImageUploader onChange={updateImages} />
          </div>
        </div>
      </div>
      <div className="container">
        <footer className="row footer-bottom">
          <button
            className="btn btn-primary"
            style={{
              display: "inline-block",
              textAlign: "center",
              width: "fit-content",
            }}
            onClick={() => handleClick(tags)}>
            Submit
          </button>
          <button
            className="btn btn-danger"
            style={{
              display: "inline-block",
              textAlign: "center",
              width: "fit-content",
            }}
            onClick={() => handleClick(tags)}>
            Discard
          </button>
        </footer>
      </div>
    </>
  );
}

export default NewRecipe;
