import React, {useEffect, useRef} from "react";

import Input from "@material-ui/core/Input";
import TitleOk from "../common/Titles/titleOk";
import PasswordField from "../common/passwordField";
import SubmitDiscardFooter from "../common/Buttons/submitDiscardFooter";
import NavBar from "../DefaultPages/navBar";
import Footer from "../DefaultPages/footer";
import EasyButton from "../common/Buttons/easyButton";
import {Link} from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";

import {toast} from "react-toastify";
import ax from "../../services/httpService";
import cfg from "../../config";
import getHeader from "../../utils/getHeader";

const Profile = (props) => {
    const ReadOnlyProfile = props.ReadOnlyProfile || false;
    const locSplitted = window.location.pathname.split("/");

    const [id, setId] = React.useState("");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");

    const [password, setPassword] = React.useState(""); // must be empty
    const [passwordConfirm, setPasswordConfirm] = React.useState(""); // must be empty
    const [newPassword, setNewPassword] = React.useState("");

    const [avatar, setAvatar] = React.useState("");
    const [bio, setBio] = React.useState("");
    const [avatarURL, setAvatarURL] = React.useState("");
    function handelLikedRecipes(){

    }
    useEffect(() => {
        console.log(props)
        console.log(ReadOnlyProfile)
        if (ReadOnlyProfile) {
            setName(props.name);
            setEmail(props.email);
            setAvatar(props.avatar);
            setBio(props.bio);
            setId(props.id);
        } else {
            console.log(props.name)
            // request from backend to get user related data
            //todo get data
            let username = JSON.parse(localStorage.getItem("user")).username
            console.log("/users/" + username)
            const backUser = ax.get(cfg.apiUrl + "/users/" + username, getHeader()).then((res) => {
                console.log(res);
                console.log(res.data.name)
                if (res.status === 200) {
                    // toast.success("Password changed");
                    setName(res.data.name);
                    setEmail(res.data.email);
                    setAvatarURL(res.data.picturePath);
                    setBio(res.data.bio);
                    setId(res.data.model.id);
                    return res.data
                } else {
                    console.log("error")
                    toast.warning("error happened");
                    window.location = "/login"
                }
            })
        }
    }, [props]);

    const refPicture = useRef();

    useEffect(() => {
        if (avatar) {
            // setAvatar(avatar);
            console.log(avatar)
            ax.post(cfg.apiUrl + "/image/" + avatar.name, avatar).then((res) => {
                console.log(res.status)
                console.log(res.data.fileName)
                setAvatarURL(res.data.fileName)
            });
        }
    }, [avatar]);

    const handleUploadImage = () => {
        //todo send image to back
        //set state url
        console.log("Uploading image...");
        refPicture.current.click();
    };

    const handleChangePassword = () => {
        console.log(password);
        console.log(passwordConfirm);
        console.log(newPassword);

        if (password === passwordConfirm) {
            // backend
            console.log("Password changed");
            const data = {oldPassword: password, newPassword: newPassword};
            console.log(data);
            console.log(getHeader());
            ax.put(cfg.apiUrl + "/password", data, getHeader()).then((res) => {
                console.log(res);
                if (res.status === 200) {
                    toast.success("Password changed");
                } else {
                    toast.warning("Password not changed");
                }
            });
        } else {
            toast.error("Passwords do not match");
        }
    };

    const handleSubmitProfile = () => {
        // todo backend
        console.log("Submitting writable profile...");
        let req = {
            name: name,
            picturePath: avatarURL,
            bio: bio
        }
        console.log(req)
        ax.post(cfg.apiUrl + "/users/" + JSON.parse(localStorage.getItem("user")).username, req, getHeader()).then((res) => {
            console.log(res.status)
            console.log(res.data)
            // setAvatarURL(res.data.imagePath)
            // setBio(res.data.bio)
            // setName(res.data.name)
        });
    };

    return (
        <>
            <NavBar searchEnabled={false}/>
            {!ReadOnlyProfile ? (
                <input
                    type="file"
                    ref={refPicture}
                    style={{display: "none"}}
                    onChange={(e) => setAvatar(e.target.files[0])}
                />
            ) : null}
            <div className="container">
                <div className="row">
                    <div className="centered mb-3">
                        <h1 className="display-5">Profile</h1>
                    </div>
                    <div className="col-3" style={{marginTop: "30px"}}>
                        {!ReadOnlyProfile ? (
                            <>
                                <ListGroup
                                    className="text-center "
                                    as="ul"
                                    style={{fontSize: "20px", margin: "40px"}}>
                                    <ListGroup.Item as="li">
                                        <Link to="/recipes/liked" onClick={handelLikedRecipes} className="no-text-decoration">
                                            Liked Recipes
                                        </Link>
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li">
                                        <Link to="/recipe-created" className="no-text-decoration">
                                            Created Recipes
                                        </Link>
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li">
                                        <Link to="/recipe-saved" className="no-text-decoration">
                                            Saved Recipes
                                        </Link>
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li">
                                        <Link to={`/${id}/follower`} className="no-text-decoration">
                                            Followers
                                        </Link>
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li">
                                        <Link
                                            to={`/${id}/following`}
                                            className="no-text-decoration">
                                            Following
                                        </Link>
                                    </ListGroup.Item>
                                </ListGroup>
                            </>
                        ) : null}
                        {ReadOnlyProfile ? (
                            <>
                                <ListGroup
                                    className="text-center "
                                    as="ul"
                                    style={{
                                        fontSize: "20px",
                                        margin: "40px",
                                    }}>
                                    <ListGroup.Item as="li">
                                        <Link to={`/${id}/follower`} className="no-text-decoration">
                                            Followers
                                        </Link>
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li">
                                        <Link
                                            to={`/${id}/following`}
                                            className="no-text-decoration">
                                            Following
                                        </Link>
                                    </ListGroup.Item>
                                </ListGroup>
                            </>
                        ) : null}

                        {avatarURL ? (
                            <div className="center-text">
                                <img
                                    alt="mdo"
                                    width="150"
                                    height="150"
                                    className="rounded-circle text-center mt-4 "
                                    src={avatarURL}
                                    alt=""
                                />
                            </div>
                        ) : null}
                        {!ReadOnlyProfile ? (
                            <div className="centered">
                                <EasyButton
                                    onClick={handleUploadImage}
                                    title={
                                        avatar ? "Change Profile Picture" : "Upload Profile Picture"
                                    }
                                />
                            </div>
                        ) : null}
                    </div>
                    <div className="col">
                        <div className="row mt-4">
                            <TitleOk title="Name"/>
                            <Input
                                disabled={ReadOnlyProfile}
                                value={name}
                                type="text"
                                placeholder="name"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="row mt-4">
                            <TitleOk title="Email"/>
                            <Input
                                disabled={ReadOnlyProfile}
                                value={email}
                                type="text"
                                placeholder="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="row mt-4">
                            <TitleOk title="Bio"/>
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
                    {!ReadOnlyProfile ? (
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
                    ) : null}
                </div>
                {!ReadOnlyProfile ? (
                    <div className="container row">
                        <SubmitDiscardFooter
                            discardTitle="Discard"
                            submitTitle="Submit"
                            onDiscard={() => (window.location.href = "/")}
                            onSubmit={handleSubmitProfile} // change backend
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
                <Footer/>
            </div>
        </>
    );
};

export default Profile;
