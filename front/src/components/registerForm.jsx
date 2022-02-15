import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from "../services/userService";
import { Link } from "react-router-dom";

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

    const output = await userService.register(this.state.data);
    //
    // console.log(output.data)
    if (output.data === "") {
      output.data = [];
    }
    localStorage.setItem("jwt", output.data["jwt"]);
    localStorage.setItem("notes", JSON.stringify(output.data["notes"]));
    localStorage.setItem("name", output.data["name"]);
    window.location = "/"; // navigate to homepage
    // above line in try catch 400 (bad request) to re-register
  };

  render() {
    const registerMessage = (
      <ul
        className=" col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 p-0"
        style={{ fontSize: "13px" }}>
        <li className="d-block">
          <Link to="/" className="    text-info ">
            Home
            <br></br>
          </Link>
        </li>
        <p></p>
        <li className="d-block">
          Do you have an account?
          {
            <Link to="/login" className=" px-2   text-info">
              Login
            </Link>
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
