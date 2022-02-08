import React, { Component } from "react";
import Button from "react-bootstrap/Button";

class Tag extends Component {
  render() {
    return (
      <>
        <Button className="p-1 m-1 badge" active="false" variant="outline-info">
          {this.props.tagName}
        </Button>{" "}
      </>
    );
  }
}

export default Tag;
