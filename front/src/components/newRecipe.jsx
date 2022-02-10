import React, { Component, useState, useEffect } from "react";
import TagMaker from "./common/tagMaker";
import StepMaker from "./common/stepMaker";
import TitleMaker from "./common/titleMaker";
import ImageUploader from "./common/imagesUploader";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./navBar";
import "./newRecipe.css";

const handleClick = (tags) => {
  window.location = "/";
};

function NewRecipe(props) {
  const isAdmin = props.isAdmin;

  const [tags, updateTags] = useState(props.tags || []);
  const [steps, updateSteps] = useState(props.steps || []);
  const [images, updateImages] = useState(props.images || []);
  const [title, updateTitle] = useState(props.title || "");

  useEffect(() => {
    console.log(tags, "useEffect tags");
    console.log(steps, "useEffect steps");
    console.log(images, "useEffect images");
    console.log(title, "useEffect title");
  }, [tags, steps, images, title]);

  return (
    <>
      <NavBar searchEnabled={false} />
      <div className="container">
        <div className="row">
          <div className="col centered">
            <TitleMaker
              onChange={updateTitle}
              isAdmin={isAdmin}
              title={props.title || ""}
            />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
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
