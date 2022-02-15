import React, { useState, useEffect, useRef } from "react";
import doIngredients from "../commonUtils/doIngredients";
import "./ingredientMaker.css";

export default function IngredientMaker(props) {
  const [ingredients, setIngredients] = useState(props.ingredients);
  const inputNameRef = useRef(null);
  const inputQuantityRef = useRef(null);
  const inputUnitRef = useRef(null);

  let newIng = {
    _id: "",
    name: "",
    quantity: "",
    unit: "",
  };

  useEffect(() => {
    props.onChange(ingredients);
  }, [ingredients]);

  const handleClick = () => {
    const newIngredients = [
      ...ingredients,
      {
        _id: Math.random().toString(36),
        name: newIng.name,
        quantity: newIng.quantity,
        unit: newIng.unit,
      },
    ];
    newIng = {
      _id: "",
      name: "",
      quantity: "",
      unit: "",
    };

    inputNameRef.current.value = "";
    inputQuantityRef.current.value = "";
    inputUnitRef.current.value = "";

    setIngredients(newIngredients);
  };

  return (
    <>
      {doIngredients(ingredients, props.isAdmin)}
      {addNewIngredient(newIng, inputNameRef, inputQuantityRef, inputUnitRef)}

      <button onClick={handleClick}>Add Ingredient</button>
    </>
  );
}

function addNewIngredient(
  newIng,
  inputNameRef,
  inputQuantityRef,
  inputUnitRef
) {
  return (
    <div className="ingredient-maker">
      <div className="ingredient-maker-input">
        <input
          ref={inputNameRef}
          type="text"
          placeholder="Ingredient name"
          onChange={(e) => {
            newIng.name = e.target.value;
          }}
        />
        <input
          ref={inputQuantityRef}
          type="text"
          placeholder="Quantity"
          onChange={(e) => {
            newIng.quantity = e.target.value;
          }}
        />
        <input
          ref={inputUnitRef}
          type="text"
          placeholder="Unit"
          onChange={(e) => {
            newIng.unit = e.target.value;
          }}
        />
      </div>
    </div>
  );
}
