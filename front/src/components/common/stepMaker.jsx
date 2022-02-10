import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./stepMaker.css";

function StepMaker({ onChange }) {
  const [steps, setSteps] = React.useState([]);

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
          console.log(step, `step at ${idx}`);
          return (
            <div className="row" key={idx}>
              <div className="col-10">
                <textarea
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
                  className="btn delete-textarea centered"
                  type="button"
                  value="X"
                  onClick={() => handleDelete(idx)}
                />
              </div>
            </div>
          );
        })}{" "}
        <a className="btn" onClick={handleAddition}>
          <p className="lead">Add Step</p>
        </a>
      </form>
    </div>
  );
}
export default StepMaker;
