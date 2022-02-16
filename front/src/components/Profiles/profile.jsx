import React, { useState, useEffect, useRef } from "react";

import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";
import TitleOk from "../common/Titles/titleOk";

import SubmitDiscardFooter from "../common/Buttons/submitDiscardFooter";
import NavBar from "../navBar";
import Footer from "../footer";
import { Link } from "react-router-dom";

import getFakeUser from "../../services/fakeUser";

const Profile = (props) => {
  const ReadOnlyProfile = props.ReadOnlyProfile || false;
  // console.log(props.url || "no id");
  const locSplitted = window.location.pathname.split("/");
  const id = window.location.pathname.split("/")[locSplitted.length - 1];

  // const [id, setId] = useState(props.match.params.id || "");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState(""); // must be empty
  const [showPassword, setShowPassword] = React.useState(false);
  const [avatar, setAvatar] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [avatarURL, setAvatarURL] = React.useState("");

  useEffect(() => {
    if (ReadOnlyProfile) {
      setName(props.name);
      setEmail(props.email);
      setAvatar(props.avatar);
      setBio(props.bio);
    } else {
      // request from backend to get user related data
      const userData = getFakeUser();
      setName(userData.name);
      setEmail(userData.email);
      setAvatar(userData.avatar);
      setPassword(userData.password);
      setBio(userData.bio);
    }
  }, [props]);

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
      {!ReadOnlyProfile ? (
        <input
          type="file"
          ref={refPicture}
          style={{ display: "none" }}
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      ) : null}
      <div className="container">
        <h1 className="display-5">Profile</h1>
        <div className="row">
          <div className="col-3" style={{ marginTop: "30px" }}>
            {!ReadOnlyProfile ? (
              <>
                <Link
                  to="/recipe-liked"
                  className="badge text-black no-text-decoration">
                  Liked Recipes
                </Link>

                <Link
                  to="/recipe-created"
                  className="badge text-black no-text-decoration">
                  Created Recipes
                </Link>
                <Link
                  to="/recipe-saved"
                  className="badge text-black no-text-decoration">
                  Saved Recipes
                </Link>
              </>
            ) : null}
            {ReadOnlyProfile ? (
              <Link
                to={`/${id}/follower`}
                className="badge text-black no-text-decoration">
                Follower
              </Link>
            ) : null}
            {ReadOnlyProfile ? (
              <Link
                to={`/${id}/following`}
                className="badge text-black no-text-decoration">
                Following
              </Link>
            ) : null}

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
            {!ReadOnlyProfile ? (
              <button
                onClick={handleUploadImage}
                className="badge text-black"
                style={{ fontSize: "13px", border: "none" }}>
                {avatar ? "Change Profile Picture" : "Upload Profile Picture"}
              </button>
            ) : null}
          </div>
          <div className="col">
            <div className="row mt-4">
              <TitleOk title="Name" />
              <Input
                disabled={ReadOnlyProfile}
                value={name}
                type="text"
                placeholder="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="row mt-4">
              <TitleOk title="Email" />
              <Input
                disabled={ReadOnlyProfile}
                value={email}
                type="text"
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="row mt-4">
              {!ReadOnlyProfile ? (
                <>
                  <TitleOk title="Password" />
                  <Input
                    value={password}
                    placeholder="password"
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </>
              ) : (
                <></>
              )}
            </div>

            <div className="row mt-4">
              <TitleOk title="Bio" />
              <textarea
                disabled={ReadOnlyProfile}
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
      {!ReadOnlyProfile ? (
        <div className="container row">
          <SubmitDiscardFooter
            discardTitle="Discard"
            submitTitle="Submit"
            onDiscard={() => (window.location.href = "/")}
            onSubmit={() => (window.location.href = "/")} // change backend
            bottom={80}
          />
        </div>
      ) : null}{" "}
      {ReadOnlyProfile ? (
        <div className="container row">
          <SubmitDiscardFooter
            discardTitle="Follow"
            submitTitle="Unfollow"
            onDiscard={() => (window.location.href = "/")}
            onSubmit={() => (window.location.href = "/")} // change backend
            bottom={80}
          />
        </div>
      ) : null}
      <div className="footer-fixed-bottom">
        <Footer />
      </div>
    </>
  );
};

export default Profile;
