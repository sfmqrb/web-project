import React, { Component } from "react";

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
    const widthStyle = {
      width: "15rem",
    };

    return (
      <div className="App">
        <form>
          {this.state.Steps.map((el, i) => {
            return (
              <div key={i}>
                <input
                  type="text"
                  value={el || ""}
                  onChange={this.handleChange.bind(this, i)}
                />
                <input
                  type="button"
                  value="remove"
                  onClick={this.removeClick.bind(this, i)}
                />
              </div>
            );
          })}

          <button onClick={this.addStep}>ADD Step</button>
        </form>
      </div>
    );
  }
}
export default StepMaker;
