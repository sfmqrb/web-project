import React from "react";
import SearchBox from "../searchBox";
import {Link} from "react-router-dom";
import Avatar from "@mui/material/Avatar";

const isLoginState = () => {
    if (localStorage.getItem("user")) {
        return true;
    } else {
        return false;
    }
};
const clr = "dark";
const NavBar = ({user, onChange, searchQuery, searchEnabled}) => {
    const isLoggedIn = isLoginState();
    return (
        <header className="p-3 mb-3 border-bottom " style={{fontSize: "1rem"}}>
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li>
                            <Link to="/" className="nav-link px-2 link-dark navlinks">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/search" className="nav-link px-2 link-dark navlinks">
                                Search
                            </Link>
                        </li>
                        {isLoggedIn ? (
                            <li>
                                <Link to="#" className="nav-link px-2 link-dark navlinks">
                                    My Recipes
                                </Link>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <Link
                                        to="/register"
                                        className="nav-link px-2 link-dark navlinks">
                                        Register
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/login"
                                        className="nav-link px-2 link-dark navlinks">
                                        Login
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                    {searchEnabled ? (
                        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                            <SearchBox onChange={onChange} searchQuery={searchQuery}/>
                        </form>
                    ) : (
                        <></>
                    )}
                    {getIsLoggedInHtml(isLoggedIn)}
                </div>
            </div>
        </header>
    );
};

const getIsLoggedInHtml = (isLoggedIn) => {
    //todo erase log
    // console.log(JSON.parse(localStorage.getItem('user')).image)
    // console.log(JSON.parse(localStorage.getItem('user')).image === "" ? JSON.parse(localStorage.getItem('user')).username.charAt(0) : JSON.parse(localStorage.getItem('user')).image)
    // console.log(JSON.parse(localStorage.getItem('user')).image = "" ? "full image": "fake image")
    return isLoggedIn ? (
        <div className="dropdown text-end">
            <Link
                to="#"
                className="d-block link-dark text-decoration-none
        dropdown-toggle"
                id="dropdownUser1"
                data-bs-toggle="dropdown"
                aria-expanded="false">

                <img
                    // todo proper image
                    // src="https://github.com/mdo.png"
                    src={JSON.parse(localStorage.getItem('user')).image = "" ?  "https://github.com/mdo.png" : JSON.parse(localStorage.getItem('user')).image}
                    alt="mdo"
                    width="50"
                    height="50"
                    className="rounded-circle"
                />
            </Link>
            <ul className="dropdown-menu text-small" aria-labelledby="dropdownUser1">
                <li>
                    <Link className="dropdown-item" to="/new-recipe">
                        New recipe...
                    </Link>
                </li>
                <li>
                    {/*todo*/}
                    <Link className="dropdown-item" to="/profile">
                        Profile
                    </Link>
                </li>
                <li>
                    <hr className="dropdown-divider"/>
                </li>
                <li>
                    <Link className="dropdown-item" to="/logout">
                        Sign out
                    </Link>
                </li>
            </ul>
        </div>
    ) : (
        <></>
    );
};

export default NavBar;
