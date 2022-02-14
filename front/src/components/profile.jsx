import React, { Component } from "react";
import NavBar from "./navBar";
import Footer from "./footer";

class Profile extends Component {
  state = {};
  // request from back to get user related data

  render() {
    return (
      <>
        <NavBar searchEnabled={false} />
        <div className="container">
          <h1>Profile</h1>
          <div className="row">
            <div className="col-3">
              <div className="row"></div>
              <div>Liked Recipes</div>
              <div>Saved Recipes</div>
              <div>My Recipes</div>
            </div>
            <div className="col-3">
              <img
                alt="mdo"
                width="150"
                height="150"
                className="rounded-circle text-center"
                src="https://unsplash.it/400/600"
                alt=""
              />
              <button className="btn text-center" style={{ fontSize: "13px" }}>
                Change Profile Picture
              </button>
            </div>
            <div className="col">
              <div className="row">
                <h3>name</h3>
                <input
                  type="text"
                  className="form-control"
                  placeholder="name"
                />
              </div>{" "}
              <div className="row">
                <h3>email</h3>
                <input
                  type="text"
                  className="form-control"
                  placeholder="email"
                />
              </div>
              <div className="row">
                <h3>Bio</h3>
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="Bio"
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default Profile;
