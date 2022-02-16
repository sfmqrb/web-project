import React, { useState, useEffect, useRef } from "react";

import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";
import TitleOk from "./common/Titles/titleOk";

import SubmitDiscardFooter from "./common/Buttons/submitDiscardFooter";
import NavBar from "./navBar";
import Footer from "./footer";
import { Link } from "react-router-dom";

const Profile = (props) => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [avatar, setAvatar] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [avatarURL, setAvatarURL] = React.useState("");

  // request from back to get user related data
  useEffect(() => {}, []);
  const refPicture = useRef();

  useEffect(() => {
    setAvatar(avatar);
    if (avatar) {
      setAvatarURL(URL.createObjectURL(avatar));
    }
  }, [avatar]);

  const handleUploadImage = () => {
    console.log("Uploading image...");
    refPicture.current.click();
  };

  return (
    <>
      <NavBar searchEnabled={false} />

      <input
        type="file"
        ref={refPicture}
        style={{ display: "none" }}
        onChange={(e) => setAvatar(e.target.files[0])}
      />
      <div className="container">
        <h1 className="display-5">Profile</h1>
        <div className="row">
          <div className="col-3" style={{ marginTop: "30px" }}>
            <Link to="/recipe-liked" className="badge text-black">
              Liked Recipes
            </Link>
            <Link to="/recipe-created" className="badge text-black">
              Created Recipes
            </Link>
            <Link to="/recipe-saved" className="badge text-black">
              Saved Recipes
            </Link>
            {avatar ? (
              <img
                alt="mdo"
                width="150"
                height="150"
                className="rounded-circle text-center mt-4"
                src={avatarURL}
                alt=""
              />
            ) : null}
            <button
              onClick={handleUploadImage}
              className="badge text-black"
              style={{ fontSize: "13px", border: "none" }}>
              {avatar ? "Change Profile Picture" : "Upload Profile Picture"}
            </button>
          </div>
          <div className="col">
            <div className="row mt-4">
              <TitleOk title="Name" />
              <Input
                value={name}
                type="text"
                placeholder="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="row mt-4">
              <TitleOk title="Email" />

              <Input
                value={email}
                type="text"
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="row mt-4">
              <TitleOk title="Password" />
              <Input
                value={password}
                placeholder="password"
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </div>

            <div className="row mt-4">
              <TitleOk title="Bio" />
              <textarea
                value={bio}
                type="text"
                className="form-control"
                placeholder="Bio"
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
          </div>
          <div className="col-5"></div>
        </div>
      </div>

      <div className="container row">
        <SubmitDiscardFooter
          discardTitle="Discard"
          submitTitle="Submit"
          bottom={80}
        />
      </div>
      <div className="footer-fixed-bottom">
        <Footer />
      </div>
    </>
  );
};

export default Profile;
