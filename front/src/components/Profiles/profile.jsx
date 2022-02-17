import React, { useState, useEffect, useRef } from "react";

import Input from "@material-ui/core/Input";
import TitleOk from "../common/Titles/titleOk";
import PasswordField from "../common/passwordField";
import SubmitDiscardFooter from "../common/Buttons/submitDiscardFooter";
import NavBar from "../DefaultPages/navBar";
import Footer from "../DefaultPages/footer";
import EasyButton from "../common/Buttons/easyButton";
import { Link } from "react-router-dom";

import getFakeUser from "../../services/fakeUser";

const Profile = (props) => {
  const ReadOnlyProfile = props.ReadOnlyProfile || false;
  // console.log(props.url || "no id");
  const locSplitted = window.location.pathname.split("/");

  const [id, setId] = useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const [password, setPassword] = React.useState(""); // must be empty
  const [passwordConfirm, setPasswordConfirm] = React.useState(""); // must be empty
  const [showPassword, setShowPassword] = React.useState(false);
  const [newPassword, setNewPassword] = React.useState("");

  const [avatar, setAvatar] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [avatarURL, setAvatarURL] = React.useState("");

  useEffect(() => {
    if (ReadOnlyProfile) {
      setName(props.name);
      setEmail(props.email);
      setAvatar(props.avatar);
      setBio(props.bio);
      setId(props.id);
    } else {
      // request from backend to get user related data
      const userData = getFakeUser();
      setName(userData.name);
      setEmail(userData.email);
      setAvatar(userData.avatar);
      setBio(userData.bio);
      setId(userData.id);
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

  const handleChangePassword = () => {
    // backend
    console.log(password);
    console.log(passwordConfirm);
    console.log(newPassword);
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
                <div>
                  <Link
                    style={{ display: "inline-block" }}
                    to="/recipe-liked"
                    className="badge text-black no-text-decoration">
                    Liked Recipes
                  </Link>
                </div>
                <div>
                  <Link
                    style={{ display: "inline-block" }}
                    to="/recipe-created"
                    className="badge text-black no-text-decoration ">
                    Created Recipes
                  </Link>
                </div>
                <div>
                  <Link
                    style={{ display: "inline-block" }}
                    to="/recipe-saved"
                    className="badge text-black no-text-decoration ">
                    Saved Recipes
                  </Link>
                </div>
              </>
            ) : null}
            {true ? (
              <div>
                <Link
                  to={`/${id}/follower`}
                  style={{ display: "inline-block" }}
                  className="badge text-black no-text-decoration">
                  Follower
                </Link>
              </div>
            ) : null}
            {true ? (
              <div>
                <Link
                  to={`/${id}/following`}
                  style={{ display: "inline-block" }}
                  className="badge text-black no-text-decoration ">
                  Following
                </Link>
              </div>
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
                className="badge text-black "
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

          <div className="col-1"></div>
          <div className="col ml-4">
            <PasswordField
              title="Password"
              placeholder="password"
              onChange={setPassword}
            />
            <PasswordField
              title="Confirm Password"
              placeholder="confirm password"
              onChange={setPasswordConfirm}
            />
            <PasswordField
              title="New Password"
              placeholder="new password"
              onChange={setNewPassword}
            />
            <div className="centered mt-4">
              <EasyButton
                title="Change Password"
                onClick={handleChangePassword}
              />
            </div>
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
      </div>

      <div className="footer-fixed-bottom">
        <Footer />
      </div>
    </>
  );
};

export default Profile;
