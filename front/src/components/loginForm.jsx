import React from "react";

import cfg from "../config";
import ax from "../services/httpService";
import EasyButton from "./common/Buttons/easyButton";
import {Link} from "react-router-dom";
import Input from "./common/Forms/input";
import "../App.css";
import {TokenIsExpires} from "../services/Tools";
import Google from "../Test";
import {render} from "react-dom";

const LoginForm = () => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleClick = () => {
        console.log("in loginForm :: handleClick");
        const data = {username, password};
        ax.post(cfg.apiUrl + "/login", data).then((res) => {
            console.log(res.data.jwt);
            console.log(res.data);
            if (res.status === 203) {
                TokenIsExpires()
                return
            }
            localStorage.setItem("jwt", res.data.jwt);
            localStorage.setItem("user", JSON.stringify(res.data));
            window.location = "/";
        });
    };


    const LoginMessage = (
        <ul
            className=" col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 p-0"
            style={{fontSize: "13px"}}>
            <li className="d-block">
                <Link to="/" className="    text-info ">
                    Home
                    <br></br>
                </Link>
            </li>
            <p></p>
            <li className="d-block">
                Don't you have an account yet?
                {
                    <Link to="/register" className=" px-2   text-info">
                        Register
                    </Link>
                }
            </li>
        </ul>
    );
    return (
        <div>
            <div className="row p-5 takeAllHeight loginImage whiteColor center-text ">
                <div className="col"></div>
                <div className="col-3 center-text" style={{fontSize: 20}}>
                    <h1 className="m-4">Login</h1>
                    {LoginMessage}
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
                    <EasyButton onClick={handleClick} title="Login"/>
                    <Google/>
                </div>
                <div className="col"></div>
            </div>
        </div>
    );
};

export default LoginForm;
