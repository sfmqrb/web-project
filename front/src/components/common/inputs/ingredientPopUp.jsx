import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const IngredientPopUp = () => (
  <Popup trigger={<button> Trigger</button>} position="right center">
    <div>Popup content here !!</div>
  </Popup>
);

export default IngredientPopUp;
