import React, { useState, useEffect } from "react";
import doIngredients from "../commonUtils/doIngredients";

export default function IngredientMaker(props) {
  const [ingredients, setIngredients] = useState(props.ingredients);

  useEffect(() => {
    props.onChange(ingredients);
  }, [ingredients]);

  const handleClick = () => {
    const [newName, newQuantity, newUnit] = ["", "", ""];

    const newIngredients = [
      ...ingredients,
      {
        id: Math.random(),
        name: newName,
        quantity: newQuantity,
        unit: newUnit,
      },
    ];
    setIngredients(newIngredients);
  };

  return (
    <>
      {doIngredients(ingredients, props.isAdmin)}
      <button onClick={handleClick}>Add Ingredient</button>
    </>
  );
}
