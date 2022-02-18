import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import ax from "../services/httpService";
import Input from "./common/Forms/input";
import EasyButton from "./common/Buttons/easyButton";
import cfg from "../config.json";

const RegisterForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleClick = () => {
    console.log("in registerForm :: handleClick");
    const data = { username, password, name, email };
    ax.post(cfg.apiUrl + "/register", data).then((res) => {
      localStorage.setItem("jwt", res.data.jwt);
      localStorage.setItem("user", JSON.stringify(res.data));
    });
    window.location = "/";
  };

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
          <Input
            name="username"
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            name="password"
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            name="name"
            label="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            name="email"
            label="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <EasyButton onClick={handleClick} title="Register" />
        </div>
        <div className="col"></div>
        <h1 className="col"></h1>
      </div>
    </div>
  );
};

export default RegisterForm;
