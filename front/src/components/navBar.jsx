import React from "react";
import SearchBox from "./searchBox";

const NavBar = ({ user, onChangeSearchBox: onChange, loginRegister }) => {
  return getLoginRegister(loginRegister);

  function getLoginRegister(loginRegister) {
    console.log(loginRegister);
    return loginRegister ? (
      <>{getLoginRegisterHtml()}</>
    ) : (
      <>{getNonLoginRegisterHtml()}</>
    );

    function getNonLoginRegisterHtml() {
      return (
        <header
          className="p-3 mb-3 border-bottom "
          style={{ fontSize: "1rem" }}>
          <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
              <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                <li>
                  <a href="/" className="nav-link px-2 link-dark navlinks">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="nav-link px-2 link-dark navlinks">
                    My Recipes
                  </a>
                </li>
                <li>
                  <a href="#" className="nav-link px-2 link-dark navlinks">
                    {/* "" */}
                  </a>
                </li>
              </ul>
              <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                <SearchBox onChange={onChange} />
              </form>
              <div className="dropdown text-end">
                <a
                  href="#"
                  className="d-block link-dark text-decoration-none dropdown-toggle"
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
                </a>
                <ul
                  className="dropdown-menu text-small"
                  aria-labelledby="dropdownUser1">
                  <li>
                    <a className="dropdown-item" href="#">
                      New recipe...
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Profile
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="/logout">
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </header>
      );
    }

    function getLoginRegisterHtml() {
      return <></>;
    }
  }
};

export default NavBar;
