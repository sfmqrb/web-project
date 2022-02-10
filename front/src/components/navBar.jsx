import React from "react";
import SearchBox from "./searchBox";
import { Link } from "react-router-dom";

const isLoginState = () => {
  if (localStorage.getItem("user")) {
    return true;
  } else {
    return false;
  }
};

const NavBar = ({ user, onChange, searchQuery, searchEnabled }) => {
  const isLoggedIn = isLoginState();
  return (
    <header className="p-3 mb-3 border-bottom " style={{ fontSize: "1rem" }}>
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <Link to="/" className="nav-link px-2 link-dark navlinks">
                Home
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
              <SearchBox onChange={onChange} searchQuery={searchQuery} />
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
          src="https://github.com/mdo.png"
          alt="mdo"
          width="50"
          height="50"
          className="rounded-circle"
        />
      </Link>
      <ul className="dropdown-menu text-small" aria-labelledby="dropdownUser1">
        <li>
          <Link className="dropdown-item" to="#">
            {" "}
            New recipe...
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" to="#">
            {" "}
            Profile
          </Link>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <Link className="dropdown-item" to="/logout">
            {" "}
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
