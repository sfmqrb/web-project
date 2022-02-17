import React, { useState, useEffect } from "react";
import getSpecificFakeCard from "../services/specificFakeCard";
import NewRecipe from "./Recipe/newRecipe";

const MoreInfoRecipe = () => {
  const [input, setInput] = useState(null);

  useEffect(() => {
    const url = window.location.href;
    const id = url.split("/")[4];
    //todo get data from back
    const tmpRecipe = getSpecificFakeCard(id);
    const tmpInput = { ...tmpRecipe, isAdmin: false };
    setInput(tmpInput);
  }, []);

  return <>{input ? <NewRecipe {...input} /> : "processing"}</>;
};

export default MoreInfoRecipe;
