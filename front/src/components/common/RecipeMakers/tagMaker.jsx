import React, { useState, useEffect } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import "./tagMaker.css";
import TitleMellow from "../Titles/titleMellow";
const KeyCodes = {
  comma: 188,
  enter: 13,
};

let suggestions = [];
const delimiters = [KeyCodes.comma, KeyCodes.enter];

const TagMaker = ({ onChange, isAdmin, tags: prTags }) => {
  useEffect(() => {
    // backend call
    const SUGGESTIONS = [
      { id: "vegetarian", text: "vegetarian" },
      { id: "vegan", text: "vegan" },
    ];
    suggestions = SUGGESTIONS.map((tag) => {
      return {
        id: tag.id,
        text: tag.text,
      };
    });
  }, []);

  //
  const [tags, setTags] = React.useState(prTags || []);
  const isNotAuthorizedToEdit = !isAdmin;
  useEffect(() => {
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

  const handleTagClick = (index) => {};
  return (
    <div className="app">
      {getMessage(isNotAuthorizedToEdit)}
      <div>
        <ReactTags
          readOnly={isNotAuthorizedToEdit}
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
function getMessage(isNotAuthorizedToEdit) {
  return isNotAuthorizedToEdit ? (
    <TitleMellow title="Tags" />
  ) : (
    <TitleMellow title="Add Tags here!!" />
  );
}
