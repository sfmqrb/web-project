import React, { useState, useEffect, useRef } from "react";
import doIngredients from "../commonUtils/doIngredients";
import "./ingredientMaker.css";

const emptyIng = {
  name: "",
  quantity: "",
  unit: "",
};

export default function IngredientMaker(props) {
  const [ingredients, setIngredients] = useState(props.ingredients);
  const inputNameRef = useRef(null);
  const inputQuantityRef = useRef(null);
  const inputUnitRef = useRef(null);

  function emptyInputs() {
    inputNameRef.current.value = "";
    inputQuantityRef.current.value = "";
    inputUnitRef.current.value = "";
  }

  let newIng = {
    name: "",
    quantity: "",
    unit: "",
  };

  useEffect(() => {
    props.onChange(ingredients);
  }, [ingredients]);

  const handleDeleteIngredient = (key) => {
    console.log(`deleting ${key}`);
    const newIngredients = ingredients.filter((ingredient) => {
      const tmpKey = ingredient.id;

      return tmpKey !== key;
    });
    setIngredients(newIngredients);
  };

  const handleClick = () => {
    if (inputNameRef.current.value === "") {
      alert("Please enter an ingredient name");
      return;
    }
    if (inputQuantityRef.current.value === "") {
      alert("Please enter an ingredient quantity");
      return;
    }
    const newIngredients = [
      ...ingredients,
      {
        id: Math.random(),
        name: newIng.name,
        quantity: newIng.quantity,
        unit: newIng.unit,
      },
    ];
    newIng = emptyIng;
    emptyInputs();
    setIngredients(newIngredients);
  };

  return (
    <>
      {doIngredients(ingredients, props.isAdmin, handleDeleteIngredient)}
      {props.isAdmin ? (
        <div>
          {addNewIngredient(
            newIng,
            inputNameRef,
            inputQuantityRef,
            inputUnitRef
          )}
          <button
            className="btn btn-info inline-button hard-inline"
            style={{ width: "fit-content" }}
            onClick={handleClick}>
            Add Ingredient
          </button>
        </div>
      ) : null}
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
    <div className="hard-inline">
      <input
        className="form-control ingredient-input input-vertical-align "
        ref={inputNameRef}
        type="text"
        placeholder="Ingredient name"
        onChange={(e) => {
          newIng.name = e.target.value;
        }}
      />
      <input
        className="form-control ingredient-input input-vertical-align"
        ref={inputQuantityRef}
        type="text"
        placeholder="Quantity"
        onChange={(e) => {
          newIng.quantity = e.target.value;
        }}
      />
      <input
        className="form-control ingredient-input input-vertical-align"
        ref={inputUnitRef}
        type="text"
        placeholder="Unit"
        onChange={(e) => {
          newIng.unit = e.target.value;
        }}
      />
    </div>
  );
}
