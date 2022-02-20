import React, {useEffect, useState} from "react";
import "./userInfo.css";
import EasyButton from "../Buttons/easyButton";
import {handelFollow, handelUnFollow} from "../../../services/Tools";

const UserInfo = (props) => {
    const [c,setC] = useState("")
    const [user, setUser] = useState({
        id: "", avatarURL: "", name: "", bio: "", email: "",
    });
    const username = user.name
    console.log(username)
    const [avatarURL, setAvatarURL] = useState("");
    const follow = () => {
        handelFollow(username)
        setC("")
    }
    const unfollow = () => {
        handelUnFollow(username)
        setC("")
    }

    useEffect(() => {
        if (props.user) {
            setUser(props.user);
            if (props.user.avatarURL) {
                setAvatarURL(props.user.avatarURL);
            } else {
                setAvatarURL(props.avatarURL);
            }
        }
    }, [props]);
    return (<div className="user-info">
      <span className="user-info__avatar" style={{marginTop: "10px"}}>
        <img
            src={avatarURL || ""}
            alt="avatar"
            width="100"
            height="100"
            className={"rounded-circle"}
        />
      </span>
        <span className="user-info__name">{user.name}</span>
        <span className="user-info__bio">{user.bio}</span>
        <span style={{right: "10%", position: "absolute"}}>
                <EasyButton title="follow" color="green"
                            onClick={follow}
                />
                <EasyButton title="unfollow"
                            onClick={unfollow}
                />
            </span>
    </div>);
};

export default UserInfo;
