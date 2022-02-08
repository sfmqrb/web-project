import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from "../services/userService";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = async () => {
    // backend
    console.log("register");
    console.log(this.state.data);
    const output = await userService.register(this.state.data);
    // console.log(output);
    // console.log(output.data)
    if (output.data === "") {
      output.data = [];
      console.log(output.data);
    }
    localStorage.setItem("jwt", output.data["jwt"]);
    localStorage.setItem("notes", JSON.stringify(output.data["notes"]));
    localStorage.setItem("name", output.data["name"]);
    window.location = "/"; // navigate to homepage
    // above line in try catch 400 (bad request) to re-register
    console.log("Submitted");
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
