import React, { useState, useEffect } from "react";
import "./titleMaker.css";
const TitleMaker = ({ onChange, isAdmin, title: prTitle }) => {
  const [title, updateTitle] = useState("");
  useEffect(() => {
    onChange(title);
  }, [title]);

  const handleChange = (e) => {
    updateTitle(e.target.value);
  };

  return (
    <input
      disabled={!isAdmin}
      defaultValue={prTitle || ""}
      className="input-title"
      type="text"
      placeholder="Title..."
      onChange={handleChange}
    />
  );
};

export default TitleMaker;
