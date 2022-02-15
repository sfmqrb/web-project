import React, { useState, useEffect } from "react";
import getSpecificFakeCard from "../services/specificFakeCard";
import NewRecipe from "./Recipe/newRecipe";

const MoreInfoRecipe = () => {
  const [input, setInput] = useState(null);

  useEffect(() => {
    const url = window.location.href;
    console.log(url);
    const id = url.split("/")[4];
    console.log(id);
    const tmpRecipe = getSpecificFakeCard(id);
    const tmpInput = { ...tmpRecipe, isAdmin: false };
    setInput(tmpInput);
    // setInput(tmpRecipe);
  }, []);

  return (
    <>
      <div>Hello</div>

      {input ? <NewRecipe {...input} /> : "processing"}
      {/* <NewRecipe isAdmin={false} {...recipe} /> */}
    </>
  );
};

export default MoreInfoRecipe;
