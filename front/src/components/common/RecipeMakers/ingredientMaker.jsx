import React, { useState, useEffect } from "react";
import doIngredients from "../commonUtils/doIngredients";

export default function IngredientMaker(props) {
  const [ingredients, setIngredients] = useState(props.ingredients);
  useEffect(() => {
    console.log(ingredients);
  }, []);

  return <>{doIngredients(ingredients)}</>;
}
