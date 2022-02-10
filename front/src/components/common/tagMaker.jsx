import React, { useState, useEffect } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import "./tagMaker.css";
const SUGGESTIONS = [
  { id: "vegetarian", text: "vegetarian" },
  { id: "vegan", text: "vegan" },
  { id: "paleo", text: "paleo" },
  { id: "dairy-free", text: "dairy-free" },
  { id: "gluten-free", text: "gluten-free" },
  { id: "keto", text: "keto" },
  { id: "pescatarian", text: "pescatarian" },
  { id: "lacto-vegetarian", text: "lacto-vegetarian" },
  { id: "ovo-vegetarian", text: "ovo-vegetarian" },
];

const suggestions = SUGGESTIONS.map((tag) => {
  return {
    id: tag.id,
    text: tag.text,
  };
});

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const TagMaker = ({ onChange }) => {
  const [tags, setTags] = React.useState([]);

  useEffect(() => {
    console.log("in useEffect");
    onChange(tags);
  }, [tags]);

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked");
  };

  return (
    <div className="app">
      <h1 className="display-6">
        <p className="m-3">Add the tags here! </p>
      </h1>
      <div>
        <ReactTags
          tags={tags}
          suggestions={suggestions}
          delimiters={delimiters}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          handleDrag={handleDrag}
          handleTagClick={handleTagClick}
          inputFieldPosition="top"
          autocomplete
        />
      </div>
    </div>
  );
};

export default TagMaker;
