import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
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
    return (
      <div>
        <div class="row p-5 takeAllHeight loginImage whiteColor center-text ">
          <h1 class="col"></h1>
          <div class="col center-text">
            <h1 className="mt-10 m-4 center">Login</h1>
            <form onSubmit={this.handleSubmit} className="">
              {this.renderInput("username", "Username")}
              {this.renderInput("password", "Password", "password")}
              {/*   replace it with better handling */}
              {this.renderButton("Login")}
            </form>
          </div>
          <div class="col"></div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
