import React, { useState, useEffect, useRef } from "react";
import doTagsEditable from "../commonUtils/doTagsEditable";
import "./tagMaker.css";

const emptyTag = {
  id: "",
  name: "",
};

let newTag = {
  id: "",
  name: "",
};

export default function TagMaker(props) {
  const [tags, setTags] = useState(props.tags);
  const inputTagRef = useRef(null);
  const widthModifier = props.widthModifier || "";

  function emptyInputs() {
    inputTagRef.current.value = "";
  }

  useEffect(() => {
    props.onChange(tags);
  }, [tags]);

  const handleDeleteTag = (key) => {
    console.log(`deleting ${key}`);
    const newTags = tags.filter((tag) => {
      const tmpKey = tag.id;
      return tmpKey !== key;
    });
    setTags(newTags);
  };

  const handleClick = () => {
    if (inputTagRef.current.value === "") {
      alert("Please enter a valid tag");
      return;
    }
    const newTags = [
      ...tags,
      {
        id: Math.random(),
        name: newTag.name,
      },
    ];
    newTag = { ...emptyTag };
    emptyInputs();
    setTags(newTags);
  };

  return (
    <>
      {doTagsEditable(tags, props.isAdmin, handleDeleteTag)}
      {props.isAdmin ? (
        <div>
          {addNewTag(newTag, inputTagRef, widthModifier)}
          <button
            className="btn btn-info inline-button  hard-inline"
            style={{ width: "fit-content" }}
            onClick={handleClick}>
            Add Tag
          </button>
        </div>
      ) : null}
    </>
  );
}

function addNewTag(newIng, inputTagRef, widthModifier = "") {
  return (
    <div className="hard-inline input-vertical-align ">
      <input
        className="form-control tag-input input-vertical-align "
        style={{ width: `${widthModifier}` }}
        ref={inputTagRef}
        type="text"
        placeholder="tag name"
        onChange={(e) => {
          newIng.name = e.target.value;
        }}
      />
    </div>
  );
}
