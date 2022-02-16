import React, { useState, useEffect } from "react";
import "./titleMaker.css";
const TitleMaker = (props) => {
  const { onChange, isAdmin, title: prTitle } = props;
  const [title, updateTitle] = useState("");
  const placeHolder = props.placeholder || "Title...";
  useEffect(() => {
    onChange(title);
  }, [title]);

  const handleChange = (e) => {
    updateTitle(e.target.value);
  };
  const introducer = isAdmin ? (
    <></>
  ) : (
    <div className="font-small  badge text-success">
      {placeHolder.slice(0, placeHolder.length - 3)}
    </div>
  );

  const TitleOutput = (
    <div>
      {introducer}
      <input
        disabled={!isAdmin}
        defaultValue={prTitle || ""}
        className={"input-" + (props.isNotTitle ? "text" : "title")}
        type="text"
        placeholder={placeHolder}
        onChange={handleChange}
      />
    </div>
  );

  const TextOutput = (
    <div>
      {introducer}
      <textarea
        disabled={!isAdmin}
        defaultValue={prTitle || ""}
        className="textarea-text-input"
        style={{}}
        type="text"
        rows="5"
        placeholder={placeHolder}
        onChange={handleChange}
      />
    </div>
  );

  return <>{props.textarea ? TextOutput : TitleOutput}</>;
};

export default TitleMaker;
