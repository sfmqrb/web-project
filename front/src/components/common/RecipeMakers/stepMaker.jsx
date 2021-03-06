import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./stepMaker.css";
import TitleMellow from "../Titles/titleMellow";

function StepMaker({ onChange, isAdmin, steps: prSteps }) {
  const [steps, setSteps] = React.useState(prSteps || []);
  const isNotAuthorizedToEdit = !isAdmin;
  useEffect(() => {
    onChange(steps);
  }, [steps]);

  const handleDelete = (i) => {
    let newSteps = steps.filter((_, index) => index !== i);
    setSteps(newSteps);
  };

  const handleAddition = () => {
    setSteps([...steps, ""]);
  };

  const textAreaChange = (e, index) => {
    let step = e.target.value;
    const newSteps = [...steps];
    newSteps[index] = step;
    setSteps(newSteps);
  };

  return (
    <div className="App">
      <form>
        {steps.map((step, idx) => {
          return (
            <div className="row" key={idx}>
              <div className="col-10">
                <textarea
                  disabled={isNotAuthorizedToEdit}
                  value={step}
                  placeholder={(idx + 1).toString() + ". "}
                  type="text"
                  onChange={(e) => textAreaChange(e, idx)}
                  cols="30"
                  rows="4"
                />
              </div>
              <div className="col-2 margin-auto centered">
                <input
                  style={{ display: isNotAuthorizedToEdit ? "none" : "block" }}
                  className="btn delete-textarea centered"
                  type="button"
                  value="X"
                  onClick={() => handleDelete(idx)}
                />
              </div>
            </div>
          );
        })}

        <a
          className="btn add-step"
          onClick={handleAddition}
          style={{
            display: isNotAuthorizedToEdit ? "none" : "block",
            width: "fit-content",
          }}>
          <TitleMellow title="Add Step" />
        </a>
      </form>
    </div>
  );
}
export default StepMaker;
