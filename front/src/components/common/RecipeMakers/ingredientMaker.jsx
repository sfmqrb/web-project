import React, { useState, useEffect, useRef } from "react";
import doIngredients from "../commonUtils/doIngredients";
import "./ingredientMaker.css";

const emptyIng = {
  _id: "",
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
    _id: "",
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
      const tmpKey =
        ingredient.name + " " + ingredient.quantity + ingredient.unit;

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
        <div className="row">
          <div className="col-md-6">
            {addNewIngredient(
              newIng,
              inputNameRef,
              inputQuantityRef,
              inputUnitRef
            )}
          </div>
          <div className="col-md-6">
            <button
              className="btn btn-info inline-button"
              style={{ width: "fit-content" }}
              onClick={handleClick}>
              Add Ingredient
            </button>
          </div>
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
    <div className="ingredient-maker">
      <div className="ingredient-maker-input">
        <input
          className="form-control ingredient-input"
          ref={inputNameRef}
          type="text"
          placeholder="Ingredient name"
          onChange={(e) => {
            newIng.name = e.target.value;
          }}
        />
        <input
          className="form-control ingredient-input"
          ref={inputQuantityRef}
          type="text"
          placeholder="Quantity"
          onChange={(e) => {
            newIng.quantity = e.target.value;
          }}
        />
        <input
          className="form-control ingredient-input"
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
