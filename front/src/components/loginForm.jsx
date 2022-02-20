import React from "react";

import cfg from "../config";
import ax from "../services/httpService";
import EasyButton from "./common/Buttons/easyButton";
import {Link} from "react-router-dom";
import Input from "./common/Forms/input";
import "../App.css";
import {TokenIsExpires} from "../services/Tools";

const LoginForm = () => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const auth = React.Component.auth
    const onSignInClick = () => {
        auth.signIn();
    };
    window.gapi.load("client: auth2", () => {
        window.gapi.client
            .init({
                clientId:
                    "344491237182-88rpfs7cpgmragionokmpddhh1va4uqf.apps.googleusercontent.com",
                scope: "email",
            })
            .then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();

                this.setState({isSignedIn: this.auth.isSignedIn.get()});
                // console.log(this.state.isSignedIn);
                // console.log(this.state.userGoodName);

                console.log("is in", this.auth.isSignedIn.le)
                // const userInitial = this.auth.currentUser.get().Qt.Ad;
                // console.log(userInitial)

                // this.setState({ userGoodName: userInitial });

                this.auth.isSignedIn.listen(this.onAuthChange);
                // console.log("signed in   ", this.state.isSignedIn)
                // console.log("user name   ", this.state.userGoodName)
                // window.location.reload()
            });
    });
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
    const handleClickGoogle = () => {
        console.log("in loginForm :: handleClickGoogle");
        const data = {username, password};
        window.location.replace(cfg.apiUrl + "/login/google");

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
                    <div>
                        <button className="g-button" onClick={onSignInClick}>
                            <img
                                className="g-logo"
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/157px-Google_%22G%22_Logo.svg.png"
                                alt="Google Logo"
                            />
                            <p className="g-text">Sign in with Google</p>
                        </button>
                        <br/>
                        <h3>Hii, If you click this button i will so you your name.</h3>
                    </div>
                </div>
                <div className="col"></div>
            </div>
        </div>
    );
};

export default LoginForm;
