import React, {useEffect, useRef, useState} from "react";
import doIngredients from "../commonUtils/doIngredients";
import "./ingredientMaker.css";
import ax from "../../../services/httpService";
import cfg from "../../../config.json";
import getHeader from "../../../utils/getHeader";
import {CheckIngredient} from "../../../services/Tools";
const emptyIng = {
    ingredientKey:"",
    name: "",
    volume: "",
};

export default function IngredientMaker(props) {
    const [ingredients, setIngredients] = useState(props.ingredients);
    const inputNameRef = useRef(null);
    const inputQuantityRef = useRef(null);
    const inputUnitRef = useRef(null);
    if (localStorage.getItem("ingredients") === null) {
        ax.get(cfg.apiUrl + "/ingredient/all", getHeader()).then((res) => {
            console.log(res);
            localStorage.setItem("ingredients", JSON.stringify(res.data))
            window.location.reload(false)
        });
    }

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
            const tmpKey = ingredient.ingredientKey;

            return tmpKey !== key;
        });
        setIngredients(newIngredients);
    };

    const handleClick = () => {
        //todo ingredient
        if (inputNameRef.current.value === "") {
            alert("Please enter an ingredient name");
            return;
        }
        if (inputQuantityRef.current.value === "") {
            alert("Please enter an ingredient quantity");
            return;
        }
        let ingredient = CheckIngredient(newIng.name)
        if (ingredient === null) {
            alert("This ingredient is not exist")
            return;
        } else {
            const newIngredients = [
                ...ingredients,
                {ingredientKey: ingredient.model.id, volume: Number(newIng.quantity), name: newIng.name},
            ];
            newIng = emptyIng;
            emptyInputs();
            setIngredients(newIngredients);
        }
    };

    return (
        <>
            {doIngredients(ingredients, props.isAdmin, handleDeleteIngredient)}
            {props.isAdmin ? (
                <div className="p-0">
                    {addNewIngredient(
                        newIng,
                        inputNameRef,
                        inputQuantityRef,
                        inputUnitRef
                    )}
                    <button
                        className="btn btn-info inline-button hard-inline"
                        style={{width: "fit-content"}}
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
        <div className="hard-inline p-0">
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
