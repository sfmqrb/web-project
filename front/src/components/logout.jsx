import React, { Component } from "react";

class Logout extends React.Component {
  componentDidMount() {
    localStorage.clear();
    window.location = "/";
  }
  render() {
    return null;
  }
}

export default Logout;
