import React, { useState, useEffect } from "react";

export default function IngredientMaker(props) {
  const [ingredients, setIngredients] = useState(props.ingredients);
  useEffect(() => {
    console.log(ingredients);
  }, []);

  return (
    <>
      <div>ingredient maker</div>
    </>
  );
}
