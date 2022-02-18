import React, {useState, useEffect, useRef} from "react";
import "./areaMaker.css";
const AreaMaker = (props) => {
  const { onChange, isAdmin, title: prTitle } = props;
  const [title, updateTitle] = useState("");
  const placeHolder = props.placeholder || "Title...";
  const myRef = useRef()
  useEffect(() => {

    // console.log("use effect area maker  " + title)
    // console.log(myRef.current);
    onChange(myRef.current.value);
  });

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
          ref = {myRef}
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
          ref = {myRef}
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

export default AreaMaker;
