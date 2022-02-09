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
  handleClick() {
    localStorage.setItem("user", true);
    window.location = "/";
  }

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
    const registerMessage = (
      <ul
        className=" col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 p-0"
        style={{ fontSize: "13px" }}>
        <li className="d-block">
          <a href="/" className="    text-info ">
            Home
            <br></br>
          </a>
        </li>
        <p></p>
        <li className="d-block">
          Do you have an account?
          {
            <a href="/login" className=" px-2   text-info">
              Login
            </a>
          }
        </li>
      </ul>
    );
    return (
      <div>
        <div className="row p-5 takeAllHeight registerImage whiteColor center-text ">
          <div className="col-3 center-text">
            <h1 className=" m-4 ">Register</h1>
            {registerMessage}
            <form onSubmit={this.handleSubmit}>
              <div className="p-2 m-1" style={{ fontSize: "13px" }}>
                {this.renderInput("username", "Username")}
              </div>
              <div className="p-2 m-1" style={{ fontSize: "13px" }}>
                {this.renderInput("password", "Password", "password")}
              </div>
              <div className="p-2 m-1" style={{ fontSize: "13px" }}>
                {this.renderInput("name", "Name")}
              </div>
              <div className="p-2 m-1" style={{ fontSize: "13px" }}>
                {this.renderButton("Register", this.handleClick)}
              </div>
            </form>
          </div>
          <div className="col"></div>
          <h1 className="col"></h1>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
