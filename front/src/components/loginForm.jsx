import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import NavBar from "./navBar";
import { login } from "../services/authService";
import "../App.css";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    // backend
    console.log("login");
    const { data } = this.state;
    console.log(data);
    const output = await login(data.username, data.password);
    console.log(output);
    localStorage.setItem("jwt", output.jwt);
    localStorage.setItem("notes", output.notes);

    window.location = "/"; // full reload of app
    // try catch 400 username not exists
    console.log("Submitted");
  };

  render() {
    const LoginMessage = (
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
          Don't you have an account yet?
          {
            <a href="/register" className=" px-2   text-info">
              Register
            </a>
          }
        </li>
      </ul>
    );
    return (
      <div>
        <div className="row p-5 takeAllHeight loginImage whiteColor center-text ">
          <NavBar loginRegister={true} />
          <div className="col"></div>
          <div className="col-3 center-text" style={{ fontSize: 20 }}>
            <h1 className="m-4">Login</h1>
            {LoginMessage}
            <form onSubmit={this.handleSubmit} className="">
              <div className="p-2" style={{ fontSize: 13 }}>
                {this.renderInput("username", "Username")}
              </div>
              <div className="p-2 mb-2" style={{ fontSize: 13 }}>
                {this.renderInput("password", "Password", "password")}
              </div>

              {this.renderButton("Login")}
            </form>
          </div>
          <div className="col"></div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
