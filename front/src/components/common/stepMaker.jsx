import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./stepMaker.css";

class StepMaker extends React.Component {
  state = {
    Steps: [],
  };

  useEffectReplacement = (steps, onChange) => {
    onChange(steps);
  };

  componentDidMount() {
    this.useEffectReplacement(this.state.Steps, this.props.onChange);
  }
  componentDidUpdate() {
    this.useEffectReplacement(this.state.Steps, this.props.onChange);
  }

  addStep = (e) => {
    e.preventDefault(); //<-----

    this.setState((prevState) => ({ Steps: [...prevState.Steps, ""] }));
  };

  handleChange(i, event) {
    let Steps = [...this.state.Steps];
    Steps[i] = event.target.value;
    this.setState({ Steps });
  }

  removeClick(i) {
    let Steps = [...this.state.Steps];
    Steps.splice(i, 1);
    this.setState({ Steps });
  }

  render() {
    return (
      <div className="App">
        <form>
          {this.state.Steps.map((el, i) => {
            return (
              <div className="row" key={i}>
                <div className="col-10">
                  <textarea
                    type="text"
                    name={el || ""}
                    onChange={this.handleChange.bind(this, i)}
                    cols="30"
                    rows="4"
                  />
                </div>
                <div className="col-2 margin-auto centered">
                  <input
                    className="btn delete-textarea centered"
                    type="button"
                    value="X"
                    onClick={this.removeClick.bind(this, i)}
                  />
                </div>
              </div>
            );
          })}{" "}
          <a className="btn" onClick={this.addStep}>
            <p className="lead">Add Step</p>
          </a>
        </form>
      </div>
    );
  }
}
export default StepMaker;
