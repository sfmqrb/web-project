import React, { useState, useEffect } from "react";
import "./userInfo.css";

const UserInfo = (props) => {
  const [user, setUser] = useState({
    id: "",
    avatar: "",
    name: "",
    bio: "",
    email: "",
  });

  const [avatarURL, setAvatarURL] = useState("");

  useEffect(() => {
    if (props.user) {
      setUser(props.user);
      if (props.user.avatar) {
        setAvatarURL(URL.createObjectURL(props.user.avatar));
      } else {
        setAvatarURL(props.avatarURL);
      }
    }
  }, [props]);

  return (
    <div className="user-info">
      <span className="user-info__avatar">
        <img
          src={avatarURL || ""}
          alt="avatar"
          width="50"
          height="50"
          className="rounded-circle"
        />
      </span>
      <span className="user-info__name">{user.name}</span>
      <span className="user-info__bio">{user.bio}</span>
    </div>
  );
};

export default UserInfo;
